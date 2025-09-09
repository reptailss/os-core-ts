import {buildLoaders} from "./buildLoaders";
import {buildPlugins} from "./buildPlugins";
import {buildResolvers} from "./buildResolvers";
import {BuildOptions, WebpackConfig} from "./types/types";
import {buildDevServer} from "./buildDevServer";


export function buildWebpack(options: BuildOptions):WebpackConfig {
    const {mode, paths} = options
    const isDev = mode === 'development';


    return {
        mode: mode ?? 'development',
        entry: paths.entry,
        output: {
            path: paths.output,
            publicPath: paths.publicPath,
            clean: true,
        },
        plugins: buildPlugins(options),
        module: {
            rules: buildLoaders(options),
        },
        devtool: isDev ? 'eval-cheap-module-source-map' : false,
        resolve: buildResolvers(options),
        devServer: isDev ? buildDevServer(options) : undefined,

    }
}
