import {Controller, DashboardUser, Post, SwaggerInfo} from '@decorators'
import {ImportOsStatusRequestLogsService} from '@logger/core'
import {SYSTEM_ROUTES} from '@systemRoutes'
import {FullUserDto} from '@auth'
import {BuildResponseFormat, ImportResult} from '@responseFormat'

@Controller()
export class ImportOsStatusRequestsLogsController {
    
    private readonly importOsStatusRequestLogsService: ImportOsStatusRequestLogsService = new ImportOsStatusRequestLogsService()
    
    @SwaggerInfo({
        disable: true,
    })
    @Post(SYSTEM_ROUTES.osImportOsStatusRequestsLogs.index)
    public async import(
        @DashboardUser() user: FullUserDto,
    ): Promise<ImportResult> {
        
        const {importCount, count} = await this.importOsStatusRequestLogsService.import()
        
        return BuildResponseFormat.import({
            importCount,
            count,
        })
    }
}