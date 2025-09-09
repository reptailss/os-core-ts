import {CronJob} from '@cron'
import {ImportOsStatusInfoLogsService, ImportOsStatusRequestLogsService} from '@logger/core'
import {APP_CONFIG_OS_CORE} from '@appConfig'
import {appLogger} from '@logger'

export class OsStatusLogsCron {
    private importOsStatusRequestLogsJob: CronJob
    private importOsStatusInfoLogsJob: CronJob

    constructor(
        private readonly importOsStatusRequestLogsService: ImportOsStatusRequestLogsService = new ImportOsStatusRequestLogsService(),
        private readonly importOsStatusInfoLogsService: ImportOsStatusInfoLogsService = new ImportOsStatusInfoLogsService(),
    ) {
        this.importOsStatusRequestLogsJob = new CronJob({
            cronTime: '*/30 * * * *',
            onTick: async () => {
                await this.importOsStatusRequestLogsService.import()
            },
            start: false,
        })

        this.importOsStatusInfoLogsJob = new CronJob({
            cronTime: '*/15 * * * * *',
            onTick: async () => {
                await this.importOsStatusInfoLogsService.saveAndImport()
            },
            start: false,
        })
    }


    public start() {
        if (!APP_CONFIG_OS_CORE.logger.hasSendOsStatusLogs) {
            return
        }
        this.importOsStatusRequestLogsJob.start()
        this.importOsStatusInfoLogsJob.start()
        appLogger.info('Success start os status import job')
    }

    public stop() {
        this.importOsStatusRequestLogsJob.stop()
        this.importOsStatusInfoLogsJob.stop()
    }
}