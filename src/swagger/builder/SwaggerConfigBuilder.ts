import path from 'path'
import fs from 'fs'
import {SwaggerConfig, SwaggerHelper} from '@swagger/core'

export class SwaggerConfigBuilder {

    public getOrCreateSwaggerConfig = async (): Promise<SwaggerConfig> => {
        const config = await this.getConfig()
        if (!config) {
            return this.writeDefaultConfig()
        }
        return config

    }


    public getConfig = async (): Promise<SwaggerConfig | null> => {
        try {
            const configPath = path.resolve(process.cwd(), 'swaggerConfig.ts')
            const configFile = await import(configPath)
            if (configFile?.default && typeof configFile.default === 'function') {
                return configFile.default()
            }
            return null
        } catch (error) {
            return null
        }
    }

    public getFromBuildFile(): SwaggerConfig {
        const {filePath} = SwaggerHelper.getSwaggerConfigBuildPaths()
        try {
            const file = fs.readFileSync(filePath, 'utf-8')
            if (!file) {
                return {
                    title: 'Swagger title',
                    description: 'Swagger description',
                    hasAuth: true,
                }
            }
            return JSON.parse(file)
        } catch (error) {
            return {
                title: 'Swagger title',
                description: 'Swagger description',
                hasAuth: true,
            }
        }
    }

    public saveToBuildFile(config: SwaggerConfig): void {
        const {filePath, dirPath} = SwaggerHelper.getSwaggerConfigBuildPaths()

        if (!fs.existsSync(dirPath)) {
            fs.mkdirSync(dirPath, {recursive: true})
        }
        fs.writeFile(
            filePath,
            JSON.stringify(config),
            'utf8',
            (error) => {
                if (error) {
                    console.error(error)
                }
            })
    }

    public writeDefaultConfig = (): SwaggerConfig => {
        const configPath = path.resolve(__dirname, '../', '../', '../', 'templates', 'swagger', 'defaultSwaggerConfig.ejs')
        const configFile = fs.readFileSync(configPath, 'utf-8')
        const outputPath = path.resolve(process.cwd(), 'swaggerConfig.ts')
        fs.writeFileSync(outputPath, configFile, 'utf-8')

        return {
            title: 'Swagger title',
            description: 'Swagger description',
            hasAuth: true,
        }
    }

}