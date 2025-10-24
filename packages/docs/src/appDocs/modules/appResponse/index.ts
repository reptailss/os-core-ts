import {DocsModule} from '@docModule/impl/DocsModule'
import {AppResponseDocPage} from '@appDocs/modules/appResponse/pages/AppResponseDocPage'

export const appResponseDocModule = new DocsModule({
    appResponse: new AppResponseDocPage()
}).setTitle('AppResponse')