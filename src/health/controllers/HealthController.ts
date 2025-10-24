import {Controller, DashboardUser, Get, SwaggerInfo} from '@decorators'
import {FullUserDto} from '@auth'
import {ReadinessService} from '@health/core'
import {OsInfo, OsInfoService, ReadinessInfo} from '@health'
import {SYSTEM_ROUTES} from '@systemRoutes'

@Controller()
export class HealthController {
    
    private readonly osInfoService: OsInfoService = new OsInfoService()
    private readonly readinessService: ReadinessService = new ReadinessService()
    
    @SwaggerInfo({
        disable: true,
    })
    @Get(SYSTEM_ROUTES.health.liveness)
    public liveness(
        @DashboardUser() userDto: FullUserDto,
    ): {
        status: 'ok'
        code: 200
    } {
        return {
            status: 'ok',
            code: 200,
        }
    }
    
    @SwaggerInfo({
        disable: true,
    })
    @Get(SYSTEM_ROUTES.health.osStatus)
    public async osStatus(
        @DashboardUser() userDto: FullUserDto,
    ): Promise<OsInfo> {
        return this.osInfoService.getOsInfo()
    }
    
    @SwaggerInfo({
        disable: true,
    })
    @Get(SYSTEM_ROUTES.health.readiness)
    public async readiness(
        @DashboardUser() userDto: FullUserDto,
    ): Promise<{
        code: 200 | 500
        status: 'ok' | 'bad'
        info: ReadinessInfo
    }> {
        return await this.readinessService.getReadiness()
    }
}