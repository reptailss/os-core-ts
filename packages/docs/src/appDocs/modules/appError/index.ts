import {DocsModule} from '@docModule/impl/DocsModule'
import {AppErrorDocPage} from '@appDocs/modules/appError/pages/AppErrorDocPage'

export const appErrorDocModule = new DocsModule({
    appError: new AppErrorDocPage()
}).setNavTitle('errors')
