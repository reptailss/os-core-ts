import {DocsModule} from '@docModule/impl/DocsModule'
import {FilesDocPage} from '@appDocs/modules/files/pages/FilesDocPage'

export const filesDocModule = new DocsModule({
    files: new FilesDocPage()
}).setTitle('files')
