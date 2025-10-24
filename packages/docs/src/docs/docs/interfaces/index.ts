import {IDocsModule} from '@docModule/interfaces'
import {DocsJson} from '@docJson/types'
import {IDocPage} from '@docPage/interfaces'

export interface IDocs {
    
    setTitle(title: string | null): this
    
    getTitle(): string | null
    
    appendModule<Pages extends {[pageName: string]: IDocPage<any>}>(module: IDocsModule<Pages>): this
    
    getModules(): IDocsModule<any>[]
    
    getJson(): DocsJson
}