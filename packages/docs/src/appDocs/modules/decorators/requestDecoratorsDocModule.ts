import {DocsModule} from '@docModule/impl/DocsModule'
import {
    RequestDecoratorsForParamsMethodDocPage
} from '@appDocs/modules/decorators/pages/RequestDecoratorsForParamsMethodDocPage'
import {RequestsDecoratorsForMethodDocPage} from '@appDocs/modules/decorators/pages/RequestsDecoratorsForMethodDocPage'

export const requestDecoratorsDocModule = new DocsModule({
    requestsDecoratorsForMethod: new RequestsDecoratorsForMethodDocPage(),
    requestDecoratorsForParamsMethod: new RequestDecoratorsForParamsMethodDocPage()
}).setTitle('request decorators')


