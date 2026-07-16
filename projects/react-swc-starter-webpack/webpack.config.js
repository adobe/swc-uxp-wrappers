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

import { resolve } from 'path';
import webpack from 'webpack';
import CopyWebpackPlugin from 'copy-webpack-plugin';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import { aliases } from '@swc-uxp-wrappers/utils';

const OUTPUT_PATH = resolve('dist');

export default (_env, argv) => {
    /**
     * === Copy static files configuration
     */
    const copyStatics = {
        patterns: [
            {
                from: 'debug.json',
                context: resolve('./'),
                to: OUTPUT_PATH,
            },
            {
                from: 'manifest.json',
                context: resolve('./'),
                to: OUTPUT_PATH,
            },
        ],
    };

    return {
        output: {
            path: OUTPUT_PATH,
            publicPath: '/',
            filename: 'bundle.js',
        },
        plugins: [
            new HtmlWebpackPlugin({
                template: 'src/index.html',
            }),
            new CopyWebpackPlugin(copyStatics),
        ],
        devServer: {
            port: 3030,
        },
        module: {
            rules: [
                {
                    test: /\.(js|jsx)$/,
                    exclude: /node_modules/,
                    use: {
                        loader: 'babel-loader',
                    },
                },
                {
                    test: /\.(sa|sc|c)ss$/,
                    use: ['style-loader', 'css-loader', 'sass-loader'],
                },
            ],
        },
        resolve: {
            extensions: ['.js', '.json'],
            // This is required for the spectrum web component to properly work in UXP
            alias: aliases,
        },
    };
};
