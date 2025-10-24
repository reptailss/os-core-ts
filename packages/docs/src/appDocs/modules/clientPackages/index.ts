import {DocsModule} from '@docModule/impl/DocsModule'
import {ClientPackagesDocPage} from '@appDocs/modules/clientPackages/pages/ClientPackagesDocPage'


export const clientPackagesDocModule = new DocsModule({
    clientPackages: new ClientPackagesDocPage()
}).setTitle('Client packages')