export class GisDistanceHelpers {

    private readonly R: number = 6371;

    public constructor(
        private readonly location1: readonly [number, number], 
        private readonly location2: readonly [number, number]
    ) {}

    private deg2radius(deg: number): number {
        return deg * (Math.PI / 180);
    }

    public getDistance(unit: string): number {
        const dLat = this.deg2radius(this.location2[0] - this.location1[0]);
        const dLon = this.deg2radius(this.location2[1] - this.location1[1]);
        const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
                  Math.cos(this.deg2radius(this.location1[0])) * Math.cos(this.deg2radius(this.location2[0])) * 
                  Math.sin(dLon / 2) * Math.sin(dLon / 2);
        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a)); 
        const distance = this.R * c; // Distance in kilometers

        return unit === 'm' 
            ? parseFloat((distance * 1000).toFixed(2)) // km to meters
            : parseFloat(distance.toFixed(2)); // km
    }

    public getLonLat1(): readonly [number, number] {
        return [this.location1[1], this.location1[0]] as const;
    }

    public getLonLat2(): readonly [number, number] {
        return [this.location2[1], this.location2[0]] as const;
    }

    public isPointInPolygon(latitude: number, longitude: number, polygon: [number, number][]): boolean {
        if (typeof latitude !== 'number' || typeof longitude !== 'number') {
            throw new TypeError('Invalid latitude or longitude. Numbers are expected');
        } else if (!Array.isArray(polygon) || polygon.length === 0) {
            throw new TypeError('Invalid polygon. Non-empty array with locations expected');
        }

        const x = latitude;
        const y = longitude;
        let inside = false;

        for (let i = 0, j = polygon.length - 1; i < polygon.length; j = i++) {
            const xi = polygon[i][0];
            const yi = polygon[i][1];
            const xj = polygon[j][0];
            const yj = polygon[j][1];

            const intersect = (yi > y) !== (yj > y) && x < ((xj - xi) * (y - yi)) / (yj - yi) + xi;
            if (intersect) inside = !inside;
        }

        return inside;
    }

}
