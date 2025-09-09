import {GmConfig} from '@gm'
import path from 'path'
import {GmWriteDefaultConfig} from './GmWriteDefaultConfig'
import {gmDefaultConfig} from './gmDefaultConfig'


export class GetGmConfig {
    static async getConfig(): Promise<GmConfig> {

        try {
            const configPath = path.resolve(process.cwd(), 'gCrudConfig.ts')
            const configFile = await import(configPath)
            if (configFile?.default && typeof configFile.default === 'function') {
                return configFile.default()
            }
            return gmDefaultConfig.default

        } catch (error) {
            GmWriteDefaultConfig.write()
            return gmDefaultConfig.default
        }

    }
}