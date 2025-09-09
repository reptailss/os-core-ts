import {ControllerDec, DashboardAccessDec, GetDec, QueryParamDec, SwaggerInfoDec} from '@decorators'
import {GetConsoleLogsService} from '@logger/core'
import {SYSTEM_ROUTES} from '@systemRoutes'
import {Validator} from '@validator'
import {FullUserInfo} from '@auth'

const dateSchema = Validator.date()

@ControllerDec()
export class GetConsoleLogsController {

    constructor(
        private readonly getConsoleLogsService: GetConsoleLogsService = new GetConsoleLogsService()) {
    }

    @SwaggerInfoDec({
        disable: true,
    })
    @GetDec(SYSTEM_ROUTES.osLogs.index)
    public getLogs(
        @QueryParamDec('date_start', dateSchema) dateStart: Date,
        @QueryParamDec('date_end', dateSchema) dateEnd: Date,
        @DashboardAccessDec userInfo: FullUserInfo,
    ): Promise<string[]> {
        return this.getConsoleLogsService.getLogs({
            dateStart,
            dateEnd,
        })
    }
}