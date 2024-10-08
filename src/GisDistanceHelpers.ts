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

}
