import fg from 'fast-glob';
import { build } from 'esbuild';

export const buildPackage = async (paths) => {
    const prodPath = paths.filter(
        (path) =>
            path.search('/test/') === -1 && path.search('/stories/') === -1
    );
    const builds = [];
    const config = {
        bundle: false,
        outdir: '.',
        outbase: '.',
        sourcemap: true,
    };
    const prodConfig = {
        ...config
    };
    if (prodPath.length) {
        builds.push(
            build({
                ...prodConfig,
                entryPoints: prodPath,
                minify: true,
                target: ['es2018'],
            }).catch(() => process.exit(1))
        );
    }
};

export const watchFiles = async () => {
    const files = await fg([
        './packages/**/!(*.d).ts',
    ]);
    return files;
};

export const buildTSFiles = async () => {
    const files = await watchFiles();
    buildPackage(files);
};
