import {DocsModule} from '@docModule/impl/DocsModule'
import {AppConfigDocPage} from '@appDocs/modules/appConfig/pages/AppConfigDocPage'


export const appConfigDocModule = new DocsModule({
    appConfig: new AppConfigDocPage()
}).setTitle('App config')