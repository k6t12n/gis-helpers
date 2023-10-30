"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GisDistanceHelpers = void 0;
class GisDistanceHelpers {
    constructor(location1, location2) {
        this.location1 = [0, 0];
        this.location2 = [0, 0];
        this.R = 6371;
        this.location1 = location1;
        this.location2 = location2;
    }
    deg2radius(deg) {
        return deg * (Math.PI / 180);
    }
    getDistance(unit) {
        let dLat = this.deg2radius(this.location2[0] - this.location1[0]);
        let dLon = this.deg2radius(this.location2[1] - this.location1[1]);
        let a = Math.sin(dLat / 2) * Math.sin(dLat / 2) + Math.cos(this.deg2radius(this.location1[0])) * Math.cos(this.deg2radius(this.location2[0])) * Math.sin(dLon / 2) * Math.sin(dLon / 2);
        let c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        let d = this.R * c; // Distance in km
        if (unit == 'm') {
            return parseFloat((d * 1000).toFixed(2)); // km -> meter
        }
        else {
            return parseFloat(d.toFixed(2));
        }
    }
    getLonLat1() {
        return [this.location1[1], this.location1[0]];
    }
    getLonLat2() {
        return [this.location2[1], this.location2[0]];
    }
}
exports.GisDistanceHelpers = GisDistanceHelpers;
