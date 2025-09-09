import {ControllerDec, DashboardAccessDec, PostDec, SwaggerInfoDec} from '@decorators'
import {ImportOsStatusRequestLogsService} from '@logger/core'
import {SYSTEM_ROUTES} from '@systemRoutes'
import {FullUserInfo} from '@auth'
import {BuildResponseFormat, ImportResult} from '@responseFormat'

@ControllerDec()
export class ImportOsStatusRequestsLogsController {

    constructor(private readonly importOsStatusRequestLogsService: ImportOsStatusRequestLogsService = new ImportOsStatusRequestLogsService()) {
    }

    @SwaggerInfoDec({
        disable: true,
    })
    @PostDec(SYSTEM_ROUTES.osImportOsStatusRequestsLogs.index)
    public async import(
        @DashboardAccessDec user: FullUserInfo,
    ): Promise<ImportResult> {

        const {importCount, count} = await this.importOsStatusRequestLogsService.import()

        return BuildResponseFormat.import({
            importCount,
            count,
        })
    }
}