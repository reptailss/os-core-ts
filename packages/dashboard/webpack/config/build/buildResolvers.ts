import { Configuration } from 'webpack';
import { BuildOptions } from './types/types';

export function buildResolvers(options: BuildOptions): Configuration['resolve'] {
    return {
        extensions: ['.tsx', '.ts', '.js', '.jsx'],
        alias: {
            '@ui': `${options.paths.src}/ui`,
            '@views': `${options.paths.src}/views`,
            '@baseTypes': `${options.paths.src}/baseTypes`,
            '@helpers': `${options.paths.src}/helpers`,
            '@hooks': `${options.paths.src}/hooks`,
            '@resources': `${options.paths.src}/resources`,
            '@containers': `${options.paths.src}/containers`,
            '@pages': `${options.paths.src}/pages`,
            '@context': `${options.paths.src}/context`,
            '@constants': `${options.paths.src}/constants`,
            '@packages': `${options.paths.src}/packages`,
            '@baseStyles': `${options.paths.src}/baseStyles`,
            '@appContext': `${options.paths.src}/appContext`,
            '@viewContext': `${options.paths.src}/viewContext`,

        },
        fallback: { 'fs': false, 'crypto': false },
    };
}
