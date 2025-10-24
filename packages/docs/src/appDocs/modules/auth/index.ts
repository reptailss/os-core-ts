import {DocsModule} from '@docModule/impl/DocsModule'
import {AuthServicesDocPage} from '@appDocs/modules/auth/pages/AuthServiceDocPage'

export const authDocModule = new DocsModule({
    auth: new AuthServicesDocPage()
}).setTitle('Auth')

