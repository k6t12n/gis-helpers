# GIS Helpers

`GIS Helpers` is a library that provides utilities for calculating distances between geographic coordinates and checking if a point is inside a polygon. This library is built to assist with geospatial calculations such as distance between two latitude and longitude points, and checking if a point lies within a polygon.

[![NPM Version][npm-image]][npm-url]  [![License][license-imge]][license-url] ![PRs Welcome](https://img.shields.io/badge/PRs-welcome-green.svg)


## Available in Other Languages

In addition to the JavaScript/TypeScript version, this library is also available in the following languages:

### Golang
For Go developers, you can use the `gis-helpers-go` library to handle geographic calculations.

Repository: [k6t12n/gis-helpers-go](https://github.com/k6t12n/gis-helpers-go)


## Installation

You can install the library using either `yarn` or `npm`:

### Using Yarn
```bash
yarn add @k6t12n/gis-helpers
```

### Using npm
```bash
npm install @k6t12n/gis-helpers
```


## Usage

### Importing the Library

To use the library in your project, import the `GisHelpers` class:

```typescript
import { GisHelpers } from 'gis-helpers';
```

### Distance Calculation

To calculate the distance between two points, instantiate the `GisHelpers` class with two sets of coordinates (latitude, longitude):

```typescript
const location1: [number, number] = [34.0522, -118.2437]; // Los Angeles
const location2: [number, number] = [40.7128, -74.0060];  // New York City

const distanceHelper = new GisHelpers(location1, location2);

const distanceInKm = distanceHelper.getDistance('km');
const distanceInMeters = distanceHelper.getDistance('m');

console.log(`Distance in kilometers: ${distanceInKm} km`);
console.log(`Distance in meters: ${distanceInMeters} meters`);
```

- The `getDistance()` method takes a unit parameter:
  - `'km'` for kilometers
  - `'m'` for meters

### Point-in-Polygon Detection

To check if a specific point lies inside a polygon, use the `isPointInPolygon` method:

```typescript
const location1: [number, number] = [34.0522, -118.2437]; // Point to check

const polygon: [number, number][] = [
    [34.0, -118.5],
    [34.2, -118.0],
    [34.5, -118.5],
    [34.0, -119.0]
]; // Example polygon

const distanceHelper = new GisHelpers(location1);

const isInside = distanceHelper.isPointInPolygon(location1[0], location1[1], polygon);
console.log(`Is the point inside the polygon? ${isInside}`);
```


## Methods

- **`getDistance(unit: string): number`**  
  Calculates the distance between two geographical coordinates in kilometers or meters.

- **`isPointInPolygon(latitude: number, longitude: number, polygon: [number, number][]): boolean`**  
  Determines whether a given point (latitude, longitude) is inside a polygon defined by an array of coordinates.


## Contributions
Loving the project? Please feel free to contribute to this project. Whether it's suggestions, features, code refactors, testing, any help is welcome.


## License

[MIT](LICENSE)

[npm-image]: https://img.shields.io/npm/v/@k6t12n/gis-helpers.svg
[npm-url]: https://npmjs.org/package/@k6t12n/gis-helpers
[license-imge]: https://img.shields.io/npm/l/@k6t12n/gis-helpers
[license-url]: https://github.com/k6t12n/gis-helpers/blob/main/LICENSE
