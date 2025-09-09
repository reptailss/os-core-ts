import { EnvType } from '../build/types/types';

export const getEnvPath = (mode?: EnvType) => {
    switch (mode) {
        case 'development' :
            return '.env.development';
        case 'build_development' :
            return '.env.build_development';
        case 'production' :
            return '.env.production';
        default :
            return '.env.development';
    }
};
