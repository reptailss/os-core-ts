import {DocsModule} from '@docModule/impl/DocsModule'
import {AppLoggerDocPage} from '@appDocs/modules/logger/pages/AppLoggerDocPage'
import {ActionsLoggerServiceDocPage} from '@appDocs/modules/logger/pages/ActionsLoggerServiceDocPage'


export const loggerDocModule = new DocsModule({
    appLogger: new AppLoggerDocPage(),
    actionsLoggerService: new ActionsLoggerServiceDocPage()
}).setTitle('logger')
