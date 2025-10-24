import {DocsModule} from '@docModule/impl/DocsModule'
import {DomainDecoratorsDocPage} from '@appDocs/modules/decorators/pages/DomainDecoratorsDocPage'

export const domainDecoratorsDocModule = new DocsModule({
    domainDecorators: new DomainDecoratorsDocPage()
}).setTitle('domain decorators')


