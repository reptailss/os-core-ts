import {Configuration, DefinePlugin} from "webpack";
import MiniCssExtractPlugin from "mini-css-extract-plugin";
import {BuildOptions} from "./types/types";
import ForkTsCheckerWebpackPlugin from "fork-ts-checker-webpack-plugin";
import ReactRefreshWebpackPlugin from "@pmmmwh/react-refresh-webpack-plugin";
import NodePolyfillPlugin from "node-polyfill-webpack-plugin";
import HtmlWebpackPlugin from "html-webpack-plugin";
import 'dotenv/config'

export function buildPlugins({mode, paths,envType}: BuildOptions): Configuration['plugins'] {
    const isDev = mode === 'development';

    const plugins: Configuration['plugins'] = [
        new MiniCssExtractPlugin(),
        new NodePolyfillPlugin(),
        new DefinePlugin({
            "process.env": JSON.stringify({
                ...process.env,
                MODE:mode,
                ENV_TYPE: envType,
            }),
        }),
        new HtmlWebpackPlugin({
            template: paths.html,
            favicon: paths.favicon,
        }),
    ]

    if (isDev) {
        plugins.push(new ForkTsCheckerWebpackPlugin())
        plugins.push(new ReactRefreshWebpackPlugin())
    }

    return plugins;
}
