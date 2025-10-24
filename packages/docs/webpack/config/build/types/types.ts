import webpack from "webpack";

export interface BuildPaths {
    entry:string,
    html?: string;
    favicon?: string;
    public: string;
    output: string;
    src: string;
    publicPath: string;
}

export type EnvType = 'production' | 'development' | 'build_development';

export type Mode = 'production' | 'development';


export interface BuildOptions {
    port: number;
    paths: BuildPaths;
    mode: Mode;
    envType:EnvType
}

export interface WebpackConfig extends webpack.Configuration {
    mode: 'production' | 'development';
    entry: string | Record<string, string>,
    output: {
        path: string,
        publicPath?: string,
        filename?: string,
        clean: boolean
    },
    plugins: any,
    module: any,
    resolve: any,
    devServer:any,
}
