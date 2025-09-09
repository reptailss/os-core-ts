import path from 'path'

const SWAGGER_BUILD_DIR_NAME = 'swagger-build'
const RESULT_AND_PARAMS_TYPES_FILE_NAME_BUILD_TS_SCHEMA = 'schemaByControllers.ts'
const TS_SCHEMA_BUILD_SCHEMA = 'tsSchema.json'
const SWAGGER_CONFIG_BUILD = 'swaggerConfig.json'

export class SwaggerHelper {
    
    static getTSSchemaPaths(): {
        filePath: string
        dirPath: string
    } {
        
        return {
            filePath: path.join(process.cwd(), SWAGGER_BUILD_DIR_NAME, TS_SCHEMA_BUILD_SCHEMA),
            dirPath: path.join(process.cwd(), SWAGGER_BUILD_DIR_NAME),
        }
        
    }
    
    static getSwaggerConfigBuildPaths(): {
        filePath: string
        dirPath: string
    } {
        
        return {
            filePath: path.join(process.cwd(), SWAGGER_BUILD_DIR_NAME, SWAGGER_CONFIG_BUILD),
            dirPath: path.join(process.cwd(), SWAGGER_BUILD_DIR_NAME),
        }
        
    }
    
    static getTSResultAndParamsPaths(appDirPath?: string): {
        filePath: string
        dirPath: string
    } {
        
        if (appDirPath) {
            return {
                filePath: path.join(process.cwd(), ...appDirPath.split('/'), SWAGGER_BUILD_DIR_NAME, RESULT_AND_PARAMS_TYPES_FILE_NAME_BUILD_TS_SCHEMA),
                dirPath: path.join(process.cwd(), ...appDirPath.split('/'), SWAGGER_BUILD_DIR_NAME),
            }
        }
        return {
            filePath: path.join(process.cwd(), 'src', SWAGGER_BUILD_DIR_NAME, RESULT_AND_PARAMS_TYPES_FILE_NAME_BUILD_TS_SCHEMA),
            dirPath: path.join(process.cwd(), 'src', SWAGGER_BUILD_DIR_NAME),
        }
        
    }
    
    static getSwaggerUrlProps(): {
        url: string
        host: string
        schemes: string[]
    } {
        const url = this.getSwaggerUrl()
        if (url.includes('https')) {
            return {
                host: url.replace('https://', ''),
                url,
                schemes: [
                    'https',
                ],
            }
        }
        return {
            host: url.replace('http://', ''),
            url,
            schemes: [
                'http',
            ],
        }
    }
    
    static getSwaggerUrl(): string {
        const envUrl = process.env.INIT_SWAGGER_URL
        if (envUrl) {
            return envUrl
        }
        const port = process.env.INIT_SERVICE_PORT
        if (port) {
            return `http://localhost:${port}`
        }
        return 'http://localhost:3000'
    }
    
    static buildAuthSwagger() {
        return {
            securityDefinitions: {
                BearerAuth: {
                    type: 'apiKey',
                    name: 'Authorization',
                    in: 'header',
                    description: 'Bearer type authorization token',
                },
            },
            security: [
                {
                    'BearerAuth': [],
                },
            ],
        }
    }
    
}