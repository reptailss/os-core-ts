import fs from 'fs'
import {RequestsLoggerHelper} from '@logger/core'
import {appLogger} from '@logger'

export class ClearRequestsLogsService {

    public clearRequests(): void {
        const filePath = RequestsLoggerHelper.getFilePath()
        fs.access(filePath, fs.constants.F_OK, (error) => {
            if (error) {
                appLogger.error(error)
                return
            }

            fs.truncate(filePath, 0, (truncateErr) => {
                if (truncateErr) {
                    appLogger.error(truncateErr)
                }
            })
        })
    };


}