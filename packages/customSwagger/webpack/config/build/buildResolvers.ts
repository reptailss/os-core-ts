import { Configuration } from 'webpack';
import { BuildOptions } from './types/types';

export function buildResolvers(options: BuildOptions): Configuration['resolve'] {
    return {
        extensions: ['.tsx', '.ts', '.js', '.jsx'],
        alias: {
            '@baseTypes': `${options.paths.src}/baseTypes`,
            '@ui': `${options.paths.src}/ui`,
            '@plugins': `${options.paths.src}/plugins`,
            '@views': `${options.paths.src}/views`,
            '@swaggerCustom': `${options.paths.src}/swaggerCustom`,
            '@spec': `${options.paths.src}/spec`,
            '@helpers': `${options.paths.src}/helpers`,
        },
        fallback: { 'fs': false, 'crypto': false },
    };
}
