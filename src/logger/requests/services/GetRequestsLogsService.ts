import fs, {promises} from 'fs'
import {RequestsLoggerHelper, ServerMeta} from '@logger/core'

export class GetRequestsLogsService {
    public async getRequestsLogs(): Promise<ServerMeta[]> {
        const str = await promises.readFile(RequestsLoggerHelper.getFilePath(), 'utf8')
        return JSON.parse(`[${str.trimEnd().slice(0, -1)}]`)
    }


    public getSyncRequests(): ServerMeta[] {
        const str = fs.readFileSync(RequestsLoggerHelper.getFilePath(), 'utf8')
        return JSON.parse(`[${str.trimEnd().slice(0, -1)}]`)
    }
}