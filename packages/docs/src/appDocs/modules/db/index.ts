import {DocsModule} from '@docModule/impl/DocsModule'
import {SqlDocPage} from '@appDocs/modules/db/pages/SqlDocPage'

export const dbDocModule = new DocsModule({
    sql: new SqlDocPage()
}).setTitle('db')
