"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GisDistanceHelpers = void 0;
class GisDistanceHelpers {
    constructor(location1, location2) {
        this.location1 = location1;
        this.location2 = location2;
        this.R = 6371;
    }
    deg2radius(deg) {
        return deg * (Math.PI / 180);
    }
    getDistance(unit) {
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
    getLonLat1() {
        return [this.location1[1], this.location1[0]];
    }
    getLonLat2() {
        return [this.location2[1], this.location2[0]];
    }
}
exports.GisDistanceHelpers = GisDistanceHelpers;
