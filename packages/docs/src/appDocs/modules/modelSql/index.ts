import {DocsModule} from '@docModule/impl/DocsModule'
import {ModelSqlDocPage} from '@appDocs/modules/modelSql/pages/ModelSqlDocPage'


export const modelSqlDocModule = new DocsModule({
    modelSql: new ModelSqlDocPage()
}).setTitle('model sql')
