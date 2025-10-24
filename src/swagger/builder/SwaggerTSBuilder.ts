import glob from 'glob'
import fs from 'fs'
import {Args, Definition, generateSchema, programFromConfig} from 'typescript-json-schema'
import {
    SwaggerConfig,
    SwaggerConfigBuilder,
    SwaggerHelper,
    SwaggerTSControllersBuilder,
    SwaggerTSHelper,
    SwaggerTsSchemas,
} from '@swagger/core'


const DEFAULT_ARGS_BUILD_SWAGGER: Args = {
    ref: true,
    aliasRef: false,
    topRef: false,
    titles: false,
    required: true,
    defaultProps: true,
    noExtraProps: false,
    propOrder: false,
    typeOfKeyword: false,
    strictNullChecks: false,
    esModuleInterop: false,
    skipLibCheck: false,
    experimentalDecorators: true,
    ignoreErrors: false,
    out: '',
    validationKeywords: [],
    include: [],
    excludePrivate: false,
    uniqueNames: false,
    rejectDateType: false,
    id: '',
    defaultNumberType: 'number',
    tsNodeRegister: false,
    constAsEnum: false,
}


export class SwaggerTSBuilder {
    
    private swaggerConfig!: SwaggerConfig
    private readonly swaggerConfigBuilder: SwaggerConfigBuilder = new SwaggerConfigBuilder()
    private readonly swaggerTSControllersBuilder: SwaggerTSControllersBuilder = new SwaggerTSControllersBuilder()
   
    
    public async buildFromControllers(): Promise<boolean> {
        const swaggerConfig = await this.swaggerConfigBuilder.getOrCreateSwaggerConfig()
        this.swaggerConfig = swaggerConfig
        this.swaggerConfigBuilder.saveToBuildFile(swaggerConfig)
        this.swaggerTSControllersBuilder.buildAndSaveToFile(swaggerConfig?.appDir, swaggerConfig?.modulesDir)
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                this.buildAndSaveSchema(swaggerConfig?.appDir)
                resolve(true)
            }, 500)
        })
    }
    
    
    private buildAndSaveSchema(appDirPath?: string) {
        
        const program = programFromConfig(
            'tsconfig.json',
            this.getFilePaths(),
        )
        const definition = generateSchema(
            program,
            '*',
            DEFAULT_ARGS_BUILD_SWAGGER,
        )
        this.saveToFile(this.normalizeSchema(definition))
        
        this.swaggerTSControllersBuilder.deleteFromFile(appDirPath)
    }
    
    private getFilePaths(): string[] {
        const tsFilesPattern = this.swaggerConfig?.appDir ? [`${this.swaggerConfig.appDir}/**/*.ts`] : ['src/**/*.ts']
        return ([] as string[]).concat(
            ...tsFilesPattern.map((f) => glob.sync(f)),
        ).map((value) => {
            while (value.substr(0, 2) === './') {
                value = value.substr(2)
            }
            return value
        })
    }
    
    private normalizeSchema(data: Definition | null): SwaggerTsSchemas {
        if (!data?.definitions) {
            return {}
        }
        const newDefinition: SwaggerTsSchemas = {}
        
        for (const key in data.definitions) {
            const isParams = SwaggerTSHelper.checkIsParamKey(key)
            
            const value = data.definitions[key]
            if (typeof value === 'boolean') {
                continue
            }
            if (!isParams) {
                newDefinition[key] = value
                continue
            }
            newDefinition[key] = this.normalizeParam(value)
        }
        
        return newDefinition
        
    }
    
    private normalizeParam(value: Definition): Definition[] {
        if (
            value?.type !== 'array' ||
            !value?.items ||
            !Array.isArray(value.items)
        ) {
            return []
        }
        return value.items?.map((item) => {
            if (!item || typeof item === 'boolean') {
                return {}
            }
            return item
        })
    }
    
    private saveToFile = (res: SwaggerTsSchemas): void => {
        
        const {filePath, dirPath} = SwaggerHelper.getTSSchemaPaths()
        
        if (!fs.existsSync(dirPath)) {
            fs.mkdirSync(dirPath, {recursive: true})
        }
        fs.writeFile(
            filePath,
            JSON.stringify(res),
            'utf8',
            (error) => {
                if (error) {
                    console.error(error)
                }
            })
        
    }
}