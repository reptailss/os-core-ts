import fs from 'fs'
import {SwaggerHelper, SwaggerTsSchemas} from '@swagger/core'


export class GetSwaggerTSService {

    public getFromFile(): SwaggerTsSchemas {
        const {filePath} = SwaggerHelper.getTSSchemaPaths()
        try {
            const file = fs.readFileSync(filePath, 'utf-8')
            if (!file) {
                return {}
            }
            return JSON.parse(file)
        } catch (error) {
            return {}
        }
    }
}