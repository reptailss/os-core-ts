import {DocsModule} from '@docModule/impl/DocsModule'
import {AppDocPage} from '@appDocs/modules/app/pages/AppDocPage'


export const appDocModule = new DocsModule({
    app: new AppDocPage()
}).setTitle('App')
