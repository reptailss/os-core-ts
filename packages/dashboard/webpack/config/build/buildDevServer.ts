import { BuildOptions } from './types/types';


export function buildDevServer(options: BuildOptions): {
    port: number,
    open: boolean,
    historyApiFallback: boolean,
    hot: boolean,
} {
    return {
        port: options.port ?? 3000,
        open: true,
        historyApiFallback: true,
        hot: true,
    };
}
