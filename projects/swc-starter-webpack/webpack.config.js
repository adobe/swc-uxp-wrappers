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

import { resolve } from "path";
import CopyWebpackPlugin from "copy-webpack-plugin";
import MiniCssExtractPlugin from "mini-css-extract-plugin";
import { CleanWebpackPlugin } from "clean-webpack-plugin";
import { BundleAnalyzerPlugin } from "webpack-bundle-analyzer";

const ENV = process.argv.find((arg) => arg.includes("NODE_ENV=production"))
  ? "production"
  : "development";
const IS_DEV = ENV === "development";

const IS_DEV_SERVER = process.argv.find((arg) => arg.includes("webpack-dev-server"));
const OUTPUT_PATH = IS_DEV_SERVER ? resolve("dist") : resolve("dist");

/**
 * === Copy static files configuration
 */
const copyStatics = {
  patterns: [
    {
      from: "index.html",
      context: resolve("./src"),
      to: OUTPUT_PATH,
    },
    {
      from: "debug.json",
      context: resolve("./"),
      to: OUTPUT_PATH,
    },
    {
      from: "manifest.json",
      context: resolve("./"),
      to: OUTPUT_PATH,
    },
  ],
};

/**
 * Plugin configuration
 */
const plugins = [
  new CleanWebpackPlugin(),
  new CopyWebpackPlugin(copyStatics),
  new MiniCssExtractPlugin({ filename: "[name].bundle.css" }),
];

const shared = (env) => {
  if (!IS_DEV_SERVER) {
    plugins.push(
      new BundleAnalyzerPlugin({
        analyzerMode: "static",
        openAnalyzer: false,
        reportFilename: "../report/report.html",
        statsFilename: "../report/stats.json",
        generateStatsFile: true,
        statsOptions: {
          chunkModules: true,
          children: false,
          source: false,
        },
      })
    );
  }

  let cssLoaders = [
    {
      loader: "css-loader",
      options: { importLoaders: 1 },
    },
    {
      loader: "postcss-loader",
      options: {
        postcssOptions: {
          plugins: (loader) => [
            require("postcss-import")({
              root: loader.resourcePath,
            }),
            require("postcss-preset-env")({
              browsers: "last 2 versions",
            }),
            ...(IS_DEV ? [] : [require("cssnano")()]),
          ],
        },
      },
    },
  ];

  return {
    entry: {
      main: "./src/index.js",
    },
    devtool: "eval-cheap-source-map",
    mode: ENV,
    output: {
      path: OUTPUT_PATH,
      filename: "[name].bundle.js",
    },
    module: {
      rules: [
        {
          test: /\.css$/,
          use: [MiniCssExtractPlugin.loader, ...cssLoaders],
        },
      ],
    },
    resolve: {
      extensions: [".js", ".json"],
      // This is required for the spectrum web component to properly work in UXP
      alias: {
        "@spectrum-web-components/banner": "@swc-wrappers/banner",
      },
    },
    plugins,
    devServer: {
      compress: true,
      port: 3000,
      host: "0.0.0.0",
    },
  };
};

export default (env = {}) => {
  return [shared(env)];
};
