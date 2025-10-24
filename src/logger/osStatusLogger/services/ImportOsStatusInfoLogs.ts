import {appLogger} from '@logger'
import {GetOsStatusOsInfoService, OsStatusLoggerInfo} from '@logger/core'
import {ImportResult} from '@responseFormat'
import {APP_CONFIG_OS_CORE} from '@appConfig'
import {AppError} from '@appError'
import {SystemEndpointsHelper, SystemRequestHelper} from '@helpers'


let osStatusOsInfo: OsStatusLoggerInfo[] = []

export class ImportOsStatusInfoLogsService {
    
    private readonly getOsStatusOsInfoService: GetOsStatusOsInfoService = new GetOsStatusOsInfoService()
    
    public async saveAndImport(): Promise<void> {
        try {
            const info = await this.getOsStatusOsInfoService.getOsInfo()
            osStatusOsInfo.push(info)
            if (osStatusOsInfo.length < 20) {
                return
            }
            await this.import()
        } catch (error) {
            appLogger.error(`Error get os-info`, error)
        }
    }

    public async import() {
        try {
            await this.importLogs(osStatusOsInfo)
            osStatusOsInfo = []
        } catch (error) {
            appLogger.error(`Failed to import os-info`, error)
        }
    }

    private async importLogs(osInfoLogs: OsStatusLoggerInfo[]): Promise<ImportResult> {
        if (!APP_CONFIG_OS_CORE.urls.osStatusServiceUrl) {
            throw new AppError('Not found os status api url in env', {
                errorKey: 'SERVER_SIDE_ERROR',
            })
        }
        return await SystemRequestHelper.post<ImportResult>({
            url: APP_CONFIG_OS_CORE.urls.osStatusServiceUrl + SystemEndpointsHelper.buildSystemEndpointUrl('/os-info-logs/import'),
            body: JSON.stringify({
                os_info_logs: osInfoLogs,
            }),
            headers: {
                'content-type': 'application/json',
            },
            serviceKey: 'os-status',
        })
    }
}