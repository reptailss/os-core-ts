import {DocsModule} from '@docModule/impl/DocsModule'
import {AccessDocPage} from '@appDocs/modules/access/pages/AccessDocPage'

export const accessDocModule = new DocsModule({
    access: new AccessDocPage()
}).setTitle('Access')
