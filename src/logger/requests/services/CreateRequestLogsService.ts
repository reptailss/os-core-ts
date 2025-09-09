import fs from 'fs'
import {RequestsLoggerHelper, ServerMeta} from '@logger/core'
import {appLogger} from '@logger'

export class CreateRequestLogsService {
    public addLogsToFile(logs: ServerMeta[]): void {
        const filePath = RequestsLoggerHelper.getFilePath()
        const str = logs.map(log => JSON.stringify(log)).join(',\n')

        fs.appendFile(filePath, `${str},`, (error) => {
            if (error) {
                appLogger.error('error save requests logs to file', error)
            }
        })

    }
}