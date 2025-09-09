import {AppModule} from '@appModule'
import {GetRequestsLogsController} from '@logger/core'

export const requestLoggerAppModule = new AppModule({
    controllers:[
        GetRequestsLogsController
    ]
})