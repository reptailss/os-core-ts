import {DocsModule} from '@docModule/impl/DocsModule'
import {EnvDocPage} from '@appDocs/modules/env/pages/EnvDocPage'


export const envDocModule = new DocsModule({
    env: new EnvDocPage()
}).setTitle('ENV')

