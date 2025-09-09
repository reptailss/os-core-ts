import {AppModule} from '@appModule'
import {GetConsoleLogsController} from '@logger/core'


export const consoleLoggerAppModule = new AppModule({
    controllers:[
        GetConsoleLogsController,
    ]
})