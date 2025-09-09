import {AppModule} from '@appModule'
import { ImportOsStatusRequestsLogsController } from '@logger/core'

export const osStatusLoggerAppModule = new AppModule({
    controllers:[
        ImportOsStatusRequestsLogsController
    ]
})