import { Configuration } from 'webpack';
import { BuildOptions } from './types/types';

export function buildResolvers(options: BuildOptions): Configuration['resolve'] {
    return {
        extensions: ['.tsx', '.ts', '.js', '.jsx'],
        alias: {
            '@sx': `${options.paths.src}/client/system/sx/index.ts`,
            '@state': `${options.paths.src}/client/system/state/index.ts`,
            '@ui': `${options.paths.src}/client/ui`,
            '@layouts': `${options.paths.src}/client/layouts`,
            '@helpers': `${options.paths.src}/client/helpers`,
            '@hooks': `${options.paths.src}/client/hooks`,
            '@pages': `${options.paths.src}/client/pages`,
            '@routes': `${options.paths.src}/client/routes`,
            '@theme': `${options.paths.src}/client/theme`,
            '@docsSearch': `${options.paths.src}/client/containers/docsSearch`,
            '@docsList': `${options.paths.src}/client/containers/docsList`,
            '@appClient': `${options.paths.src}/client/appClient`,
            '@docJson': `${options.paths.src}/docJson`,
            '@docBlocks': `${options.paths.src}/docs/docBlocks`,
            '@docModule': `${options.paths.src}/docs/docModule`,
            '@docs': `${options.paths.src}/docs/docs`,
            '@docPage': `${options.paths.src}/docs/docPage`,
            '@appDocs': `${options.paths.src}/appDocs`,
        },
        fallback: { 'fs': false, 'crypto': false },
    };
}
