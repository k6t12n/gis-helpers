export class GisHelpers {

    private readonly R: number = 6371;
    private readonly location2?: readonly [number, number];

    public constructor(
        private readonly location1: readonly [number, number], 
        location2?: readonly [number, number] // optional second argument
    ) {
        this.location2 = location2;
    }

    private deg2radius(deg: number): number {
        return deg * (Math.PI / 180);
    }

    public getDistance(unit: string): number {
        if (!this.location2) {
            throw new Error("Location2 is required for distance calculation.");
        }  
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
        if (!this.location2) {
            throw new Error("location2 not provided");
        }    
        return [this.location2[1], this.location2[0]] as const;
    }

    public isPointInPolygon(polygon: [number, number][]): boolean {
        if (!this.location1 || typeof this.location1[0] !== 'number' || typeof this.location1[1] !== 'number') {
            throw new TypeError('Invalid location1. Latitude and longitude must be numbers.');
        } else if (!Array.isArray(polygon) || polygon.length === 0) {
            throw new TypeError('Invalid polygon. Non-empty array with locations expected.');
        }
    
        const x = this.location1[0]; // latitude from location1
        const y = this.location1[1]; // longitude from location1
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
