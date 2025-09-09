import {ControllerDec, DashboardAccessDec, GetDec, SwaggerInfoDec} from '@decorators'
import {FullUserInfo} from '@auth'
import {ReadinessService} from '@health/core'
import {OsInfo, OsInfoService, ReadinessInfo} from '@health'
import {SYSTEM_ROUTES} from '@systemRoutes'

@ControllerDec()
export class HealthController {

    constructor(
        private readonly osInfoService = new OsInfoService(),
        private readonly readinessService = new ReadinessService(),
    ) {
    }


    @SwaggerInfoDec({
        disable: true,
    })
    @GetDec(SYSTEM_ROUTES.health.liveness)
    public liveness(
        @DashboardAccessDec user: FullUserInfo,
    ): {
        status: 'ok'
        code: 200
    } {
        return {
            status: 'ok',
            code: 200,
        }
    }

    @SwaggerInfoDec({
        disable: true,
    })
    @GetDec(SYSTEM_ROUTES.health.osStatus)
    public async osStatus(
        @DashboardAccessDec user: FullUserInfo,
    ): Promise<OsInfo> {
        return this.osInfoService.getOsInfo()
    }

    @SwaggerInfoDec({
        disable: true,
    })
    @GetDec(SYSTEM_ROUTES.health.readiness)
    public async readiness(
        @DashboardAccessDec user: FullUserInfo,
    ): Promise<{
        code: 200 | 500
        status: 'ok' | 'bad'
        info: ReadinessInfo
    }> {
        return await this.readinessService.getReadiness()
    }
}