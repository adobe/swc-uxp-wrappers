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

import fg from 'fast-glob';
import { build } from 'esbuild';

export const buildPackage = async (paths) => {
    const builds = [];
    const config = {
        bundle: false,
        outdir: '.',
        outbase: '.',
        sourcemap: true,
    };
    const prodConfig = {
        ...config,
    };
    if (paths.length) {
        builds.push(
            build({
                ...prodConfig,
                entryPoints: paths,
                minify: true,
                target: ['es2018'],
            }).catch(() => process.exit(1))
        );
    }
};

export const watchFiles = async () => {
    const files = await fg(['./packages/**/!(*.d).ts']);
    return files;
};

export const buildTSFiles = async () => {
    const files = await watchFiles();
    buildPackage(files);
};
