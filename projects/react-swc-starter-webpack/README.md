# Overview

This project shows a use of the Spectrum Web Component's React Wrapper in UXP with webpack in conjunction with swc-uxp-wrappers.

# Usage

First install with `npm run install` or `yarn install` then start the build and run the web server with `npm run serve`. This will build the production version of the example app and serve it via `http-server`.
To generate dist output folder run `yarn build`

# Config

1. You need to add `@swc-react/<component-name>` in the package dependencies
2. Also add `@swc-uxp-wrappers/<component-name>` in the package dependencies
3. Add it as alias for `@spectrum-web-components/<component-name>` in webpack config file
   or
   Add `@swc-uxp-wrappers/utils` which exports a defined set of aliases used in the library serving as an abstraction for the need of aliasing by integrators.

For example:

-   `package.json`

```json
"dependencies": {
    "@swc-uxp-wrappers/banner": "^0.0.1",
    "@swc-react/banner": "0.9.5-react.3120",
}
```

-   `webpack.config.js`

```js
import { aliases } from '@swc-uxp-wrappers/utils';

resolve: {
    extensions: ['.js', '.json'],
    // This is required for the spectrum web component to properly work in UXP
    alias: aliases,
}
```
