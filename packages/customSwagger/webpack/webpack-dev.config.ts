import path from 'path';
import {buildWebpack} from "./config/build/buildWebpack";
import {BuildPaths, EnvType, Mode} from "./config/build/types/types";
import {getEnvPath} from "./config/helpers";


interface EnvVariables {
    mode?: Mode;
    env_type?: EnvType;
    port?: number;
}


export default (env: EnvVariables) => {

    const envPath = getEnvPath(env?.env_type)
    require('dotenv').config({path: envPath})

    const paths: BuildPaths = {
        output: path.resolve(__dirname, '../build'),
        entry: path.resolve(__dirname, '../src', 'main.tsx'),
        public: path.resolve(__dirname, '../public'),
        html: path.resolve(__dirname, '../public', 'index.html'),
        src: path.resolve(__dirname, '../src'),
        publicPath: '/',
        favicon: path.resolve(__dirname, '../public', 'favicon.ico'),
    }

    return buildWebpack({
        port: process.env.PORT ? Number(process.env.PORT) : 3094,
        mode: env.mode ?? 'development',
        paths,
    })

}

