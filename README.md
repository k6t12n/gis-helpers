# GIS Helpers
Helpers for GIS calculations

[![NPM Version][npm-image]][npm-url]  [![License][license-imge]][license-url] ![PRs Welcome](https://img.shields.io/badge/PRs-welcome-green.svg)

## Installation

```sh
npm install @k6t12n/gis-helpers
# or
yarn add @k6t12n/gis-helpers
```

## Usage

For getting distance between 2 location:
```javascript
import GisHelpers from "@k6t12n/gis-helpers";

const distance = new GisHelpers.GisDistanceHelpers([17.970108, 102.618053], [17.962941, 102.610572])
console.log('distance in metre: ', distance.getDistance('m'))
console.log('distance in km: ', distance.getDistance('km'))
console.log('lon_lat1: ', distance.getLonLat1())
console.log('lon_lat2: ', distance.getLonLat2())

```

## Contributions
Loving the project? Please feel free to contribute to this project. Whether it's suggestions, features, code refactors, testing, any help is welcome.

## License

[MIT](LICENSE)

[npm-image]: https://img.shields.io/npm/v/@k6t12n/gis-helpers.svg
[npm-url]: https://npmjs.org/package/@k6t12n/gis-helpers
[license-imge]: https://img.shields.io/npm/l/@k6t12n/gis-helpers
[license-url]: https://github.com/k6t12n/gis-helpers/blob/main/LICENSE