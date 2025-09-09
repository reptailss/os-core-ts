import {ControllerDec, DashboardAccessDec, GetDec, SwaggerInfoDec} from '@decorators'
import {SYSTEM_ROUTES} from '@systemRoutes'
import {FullUserInfo} from '@auth'
import {GetRequestsLogsService, ServerMeta} from '@logger/core'
import {RequestsLogsRoutesRegistry} from '@logger'

@ControllerDec()
export class GetRequestsLogsController {

    constructor(private readonly getRequestsLogsService: GetRequestsLogsService = new GetRequestsLogsService()) {
    }

    @SwaggerInfoDec({
        disable: true,
    })
    @GetDec(SYSTEM_ROUTES.osRequestsInfo.index)
    public async getLogs(
        @DashboardAccessDec userInfo: FullUserInfo,
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