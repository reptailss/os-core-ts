import {DocsModule} from '@docModule/impl/DocsModule'
import {DomainDocPage} from '@appDocs/modules/domain/pages/DomainDocPage'

export const domainDocModule = new DocsModule({
    domain: new DomainDocPage()
}).setTitle('domain')
