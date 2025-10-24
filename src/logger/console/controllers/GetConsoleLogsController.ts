import {Controller, DashboardUser, Get, QueryParam, SwaggerInfo} from '@decorators'
import {GetConsoleLogsService} from '@logger/core'
import {SYSTEM_ROUTES} from '@systemRoutes'
import {Validator} from '@validator'
import {FullUserDto} from '@auth'

const dateSchema = Validator.date()

@Controller()
export class GetConsoleLogsController {
    
    private readonly getConsoleLogsService: GetConsoleLogsService = new GetConsoleLogsService()
    
    @SwaggerInfo({
        disable: true,
    })
    @Get(SYSTEM_ROUTES.osLogs.index)
    public getLogs(
        @QueryParam('date_start', dateSchema) dateStart: Date,
        @QueryParam('date_end', dateSchema) dateEnd: Date,
        @DashboardUser() userDto: FullUserDto,
    ): Promise<string[]> {
        return this.getConsoleLogsService.getLogs({
            dateStart,
            dateEnd,
        })
    }
}