# Spectrum Web Components UXP Wrappers
 
## What is this effort?

The opensource [Spectrum Web Components(SWC)](https://github.com/adobe/spectrum-web-components) UI library (hereafter referred to as SWC) targets the modern browser as a platform, replete with support for almost all CSS properties, layout models and Web APIs conforming to the latest standards. UXP never intends to be an all-encompassing browser and thus doesn't support a considerable section of these aforementioned APIs and properties. To bridge this chasm, the UXP team has decided to supplant some of the CSS properties and layout models with other UXP-supported properties in an attempt to achieve UI parity with that of SWC on web. This wrapper is an implementation of this approach.

## What does this repository contain?

This repository contains, as the name implies, wrappers over the opensource SWC components so that these components can be used in a UXP context, utilizing CSS properties etc. that are compatible with the UXP library.

## How does this approach work?

UXP doesn't _re-create_ the entire SWC repository but rather _extends_ from the existing components and (currently) only _overrides_ the CSS styles to address the gaps between UXP and that of a modern web browser. An example to illustrate this is wherein the `display: grid` property which indicates the usage of a Grid layout is replaced with `display: flex` (Flex layout model) and other appurtenant changes in CSS styles to achieve parity with Grid layout.

### This approach allows us to

-   override the css styles to make the component work properly in UXP
-   lock the underlying spectrum web component version to be compatible with UXP, insulating UXP wrappers from frequent changes in the SWC library

# Getting started

## Software Requirements

-   `node >= 18.15.11`
-   `yarn >= 1.22.4`

## Build Steps

1. Clone the repository:

```
$ git clone git@git.corp.adobe.com:torq/swc-uxp-wrappers.git
$ cd swc-uxp-wrappers
```

2. Install the required dependencies using below command:

```
$ yarn
```

3. To build the packages, run below command:

```
$ yarn build
```

## Creating a new wrapper package

Creating a new wrapper package from the command line can be done by running the following:

```
$ yarn new-package
```

This will scaffold your wrapper's required folder structure by prompting you for 2 data points -

? **SWC package name (i.e. banner)**

Name of spectrum web component package for which wrapper is required

? **SWC package version compatible with UXP (i.e. 0.9.2)**

Version of the above spectrum web component which is compatible with UXP.

You can find this information in the wiki - [Support for Spectrum Web Components in UXP](https://wiki.corp.adobe.com/display/UXP/Support+for+Spectrum+Web+Components+in+UXP)

## Contributing

We'd be very grateful if you contributed to the project! Check out our [contribution guidelines](./CONTRIBUTING.md) for more information.

## Licensing

This project is licensed under the Apache V2 License. See [LICENSE](./LICENSE.txt) for more information.
