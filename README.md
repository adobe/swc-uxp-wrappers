# Spectrum Web Components UXP Wrappers

For supporting [Spectrum Web Components(SWC)](https://github.com/adobe/spectrum-web-components) in UXP, we are creating wrappers over each spectrum web component.

This approach allows us to

-   override the css styles to make the component work properly in UXP
-   lock the underlying spectrum web component version to be compatible with UXP

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
