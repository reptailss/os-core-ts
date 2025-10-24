import {Controller, DashboardUser, Get, SwaggerInfo} from '@decorators'
import {SYSTEM_ROUTES} from '@systemRoutes'
import {FullUserDto} from '@auth'
import {GetRequestsLogsService, ServerMeta} from '@logger/core'
import {RequestsLogsRoutesRegistry} from '@logger'

@Controller()
export class GetRequestsLogsController {
    
    private readonly getRequestsLogsService: GetRequestsLogsService = new GetRequestsLogsService()
    
    @SwaggerInfo({
        disable: true,
    })
    @Get(SYSTEM_ROUTES.osRequestsInfo.index)
    public async getLogs(
        @DashboardUser() userDto: FullUserDto,
    ): Promise<{
        rows: ServerMeta[]
        paths: string[]
    }> {
        
        const rows = await this.getRequestsLogsService.getRequestsLogs()
        return {
            rows,
            paths: RequestsLogsRoutesRegistry.getRoutePaths(),
        }
    }
}