import {DocsModule} from '@docModule/impl/DocsModule'
import {AccessDecoratorsDocPage} from '@appDocs/modules/decorators/pages/AccessDecoratorsDocPage'

export const accessDecoratorsDocModule = new DocsModule({
    accessDecorators: new AccessDecoratorsDocPage()
}).setTitle('access decorators')


