/*
Copyright 2023 Adobe. All rights reserved.
This file is licensed to you under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License. You may obtain a copy
of the License at http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software distributed under
the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
OF ANY KIND, either express or implied. See the License for the specific language
governing permissions and limitations under the License.
*/

const { execSync } = require("child_process");
const { kebabCase } = require("lodash");

const path = require('path');
const fs = require('fs');
const configPath = path.resolve(path.join(__dirname, '..', '..', 'config'));
let header;
try {
    header = fs.readFileSync(path.join(configPath, 'license.js'), 'utf8');
} catch (error) {
    throw new Error(error);
}

header = header.replace('<%= YEAR %>', new Date().getFullYear());

module.exports = function (plop) {
  plop.setPartial("headerPartial", header);
  // name of custom element tag
  plop.setPartial("tagnamePartial", "sp-{{name}}");
  plop.setPartial("uxpClassNamePartial", "Uxp{{className name}}");
  // name of LitElement class
  plop.setHelper("className", function (name) {
    const camel = name.replace(/-([a-z])/g, (g) => {
      return g[1].toUpperCase();
    });
    camel[0] = camel[0].toUpperCase();
    const capitalized = camel.charAt(0).toUpperCase() + camel.substring(1);
    return capitalized;
  });

  plop.setActionType("install deps", function (answers) {
    execSync(`cd ../../ && yarn`);
  });

  plop.setActionType("build css", function (answers) {
    execSync(`cd ../../ && yarn build:css`);
  });

  plop.setGenerator("component", {
    description: "application controller logic",
    prompts: [
      {
        type: "input",
        name: "name",
        message: "SWC package name (i.e. banner)",
        validate: (answer) => {
          if (answer.length < 1) {
            return "It's a fact universally acknowledged that naming is hard; but it must have a name. You can always change it later.";
          } else return true;
        },
        // Convert the input into kebab case if not provided as such and strip swc- prefixing if present
        filter: (response) => kebabCase(response.replace(/^sp-/, "")),
      },
      {
        type: "input",
        name: "version",
        message: "SWC package version compatible with UXP (i.e. 0.9.2)",
        // Remove the package prefix if provided and strip out any dashes or spaces in the result
        filter: (response) => {
          return response.replace(/^\@spectrum-web-components\//, "").replace(/[-|\s]/g, "");
        },
      },
    ],
    actions: [
      {
        type: "add",
        path: "../../packages/{{name}}/src/index.ts",
        templateFile: "plop-templates/index.ts.hbs",
      },
      {
        type: "add",
        path: "../../packages/{{name}}/src/{{className name}}.ts",
        templateFile: "plop-templates/component.ts.hbs",
      },
      {
        type: "add",
        path: "../../packages/{{name}}/{{> tagnamePartial }}.ts",
        templateFile: "plop-templates/component-registration.ts.hbs",
      },
      {
        type: "add",
        path: "../../packages/{{name}}/src/{{name}}.css",
        templateFile: "plop-templates/component.css.hbs",
      },
      {
        type: "add",
        path: "../../packages/{{name}}/README.md",
        templateFile: "plop-templates/README.md.hbs",
      },
      {
        type: "add",
        path: "../../packages/{{name}}/tsconfig.json",
        templateFile: "plop-templates/tsconfig.json.hbs",
      },
      {
        type: "add",
        path: "../../packages/{{name}}/package.json",
        templateFile: "plop-templates/package.json.hbs",
      },
      {
        type: "install deps",
      },
      {
        type: "build css",
      },
    ],
  });
};
