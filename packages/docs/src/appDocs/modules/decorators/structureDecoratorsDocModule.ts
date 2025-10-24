import {DocsModule} from '@docModule/impl/DocsModule'
import {StructureDecoratorsDocPage} from '@appDocs/modules/decorators/pages/structureDecoratorsDocPage'

export const structureDecoratorsDocModule = new DocsModule({
    structureDecorators: new StructureDecoratorsDocPage()
}).setTitle('structure decorators')


