import {APP_CONFIG_OS_CORE} from '@appConfig'
import {appLogger} from '@logger'
import {ClearRequestsLogsService, CreateRequestLogsService, GetRequestsLogsService, ServerMeta} from '@logger/core'
import {SystemEndpointsHelper, SystemRequestHelper} from '@helpers'
import {ImportResult} from '@responseFormat'


export class ImportOsStatusRequestLogsService {
    private readonly BATCH_SIZE = 150

    constructor(
        private readonly getRequestsLogsService: GetRequestsLogsService = new GetRequestsLogsService(),
        private readonly clearRequestsLogsService: ClearRequestsLogsService = new ClearRequestsLogsService(),
        private readonly createRequestLogsService: CreateRequestLogsService = new CreateRequestLogsService(),
    ) {
    }

    public async import(): Promise<{
        count: number,
        importCount: number
    }> {
        if (!APP_CONFIG_OS_CORE.urls.osStatusServiceUrl) {
            appLogger.error('Not found os status api url in env')
            return {
                count: 0,
                importCount: 0,
            }
        }

        try {
            const logs = this.getRequestsLogsService.getSyncRequests()
            if (!logs?.length) {
                return {
                    count: 0,
                    importCount: 0,
                }
            }

            this.clearRequestsLogsService.clearRequests()
            let totalImportCount = 0
            let totalCount = 0
            const errorImportData: ServerMeta[][] = []
            for (let i = 0; i < logs.length; i += this.BATCH_SIZE) {
                const batch = logs.slice(i, i + this.BATCH_SIZE)
                totalCount += batch.length
                try {
                    const response = await this.importLogs(batch)
                    if (typeof response?.count !== 'number') {
                        continue
                    }
                    totalImportCount += response?.import_count
                    appLogger.info(`Success import requests ${response.import_count}`)
                } catch (error) {
                    errorImportData.push(batch)
                    appLogger.error(`Failed to import requests`, error)
                }
            }
            if (errorImportData.length >= 1) {
                this.saveLogsToFile(errorImportData)
            }
            return {
                count: totalCount,
                importCount: totalImportCount,
            }
        } catch (error) {
            appLogger.error('error import os status logs', error)
            return {
                count: 0,
                importCount: 0,
            }
        }
    }

    private async importLogs(requestLogs: ServerMeta[]): Promise<ImportResult> {
        return await SystemRequestHelper.post<ImportResult>({
            url: APP_CONFIG_OS_CORE.urls.osStatusServiceUrl + SystemEndpointsHelper.buildSystemEndpointUrl('/request-logs/import'),
            body: JSON.stringify({
                request_logs: requestLogs,
            }),
            headers: {
                'content-type': 'application/json',
            },
            serviceKey: 'os-status',
        })
    }

    private saveLogsToFile(logsList: ServerMeta[][]) {
        for (const logs of logsList) {
            this.createRequestLogsService.addLogsToFile(logs)
        }
    }
}