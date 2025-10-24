import {ModuleOptions} from "webpack";

import {BuildOptions} from "./types/types";
import {buildBabelLoader} from "./babel/buildBabelLoader";

export function buildLoaders(options: BuildOptions): ModuleOptions['rules'] {

    const isDev = options.mode === 'development'

    const assetLoader = {
        test: /\.(png|jpg|jpeg|gif)$/i,
        type: 'asset/resource',
    }

    const svgLoader = {
        test: /\.svg$/,
        use: [
            {
                loader: require.resolve('@svgr/webpack'),
                options: {
                    prettier: false,
                    svgo: false,
                    svgoConfig: {
                        plugins: [{removeViewBox: false}],
                    },
                    titleProp: true,
                    ref: true,
                },
            },
            {
                loader: require.resolve('file-loader'),
                options: {
                    name: `static/media/[name].[hash].[ext]`,
                },
            },
        ],
    }

    const babelLoader = buildBabelLoader(options);

    const cssLoader = {
        test: /\.css$/,
        use: [
            {
                loader: 'style-loader',
            },
            {
                loader: 'css-loader',
                options: {
                    sourceMap: isDev,
                    importLoaders: 2,
                },
            },
        ],
    }

    const scssLoader = {
        test: /\.scss$/,
        use: [
            {
                loader: 'style-loader',
                options: {
                    sourceMap: isDev,
                },
            },
            {
                loader: 'css-loader',
                options: {
                    sourceMap: isDev,
                    importLoaders: 3,
                },
            },
            {
                loader: 'sass-loader',
                options: {
                    sourceMap: isDev,
                },
            },
        ],
    }

    const zip = {
            test: /\.zip$/,
            exclude: /node_modules/,
            use: 'ignore-loader',

        }


        const tse = {
            test: /\.tse$/,
            use: 'raw-loader'
        }

    return [
        assetLoader,
        svgLoader,
        cssLoader,
        scssLoader,
        babelLoader,
        zip,
        tse,
    ]
}
