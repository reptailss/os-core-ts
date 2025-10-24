import {DocsModule} from '@docModule/impl/DocsModule'
import {AppModuleDocPage} from '@appDocs/modules/appModule/pages/AppModuleDocPage'


export const appModuleDocModule = new DocsModule({
    appModule: new AppModuleDocPage()
}).setTitle('App Module')
