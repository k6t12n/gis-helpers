export class GisDistanceHelpers {

    private location1: readonly [number, number] = [0, 0];
    private location2: readonly [number, number] = [0, 0];

    private R: number = 6371;

    public constructor(location1: readonly [number, number], location2: readonly [number, number]) {
        this.location1 = location1;
        this.location2 = location2;
    }

    private deg2radius(deg: number): number {
        return deg * (Math.PI / 180)
    }

    public getDistance(unit: string): number {

        let dLat: number = this.deg2radius(this.location2[0] - this.location1[0]);
        let dLon: number = this.deg2radius(this.location2[1] - this.location1[1]);
        let a = Math.sin(dLat / 2) * Math.sin(dLat / 2) + Math.cos(this.deg2radius(this.location1[0])) * Math.cos(this.deg2radius(this.location2[0])) * Math.sin(dLon / 2) * Math.sin(dLon / 2)

        let c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
        let d = this.R * c; // Distance in km

        if (unit == 'm') {
            return parseFloat((d * 1000).toFixed(2)); // km -> meter
        } else {
            return parseFloat(d.toFixed(2))
        }
        
    }

}