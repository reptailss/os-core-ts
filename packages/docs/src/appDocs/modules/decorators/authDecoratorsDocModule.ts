import {DocsModule} from '@docModule/impl/DocsModule'
import {AuthDecoratorsDocPage} from '@appDocs/modules/decorators/pages/AuthDecoratorsDocPage'

export const authDecoratorsDocModule = new DocsModule({
    authDecorators: new AuthDecoratorsDocPage()
}).setTitle('auth decorators')



