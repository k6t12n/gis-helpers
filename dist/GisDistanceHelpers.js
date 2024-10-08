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
    isPointInPolygon(latitude, longitude, polygon) {
        if (typeof latitude !== 'number' || typeof longitude !== 'number') {
            throw new TypeError('Invalid latitude or longitude. Numbers are expected');
        }
        else if (!Array.isArray(polygon) || polygon.length === 0) {
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
            if (intersect)
                inside = !inside;
        }
        return inside;
    }
}
exports.GisDistanceHelpers = GisDistanceHelpers;
