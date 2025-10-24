import {DocsModule} from '@docModule/impl/DocsModule'
import {ApiDecoratorsDocPage} from '@appDocs/modules/decorators/pages/ApiDecoratorsDocPage'

export const apiDecoratorsDocModule = new DocsModule({
    apiDecorators: new ApiDecoratorsDocPage()
}).setTitle('api decorators')

