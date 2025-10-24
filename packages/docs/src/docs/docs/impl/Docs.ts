import {IDocs} from '@docs/interfaces'
import {DocsJson} from '@docJson/types'
import {IDocsModule} from '@docModule/interfaces'
import {DocsModulesToJsonConverter} from '@docModule/impl/DocsModulesToJsonConverter'
import {IDocPage} from '@docPage/interfaces'

export class Docs implements IDocs {
    private title: string | null = null
    private modules: IDocsModule<any>[] = []
    
    
    public setTitle(title: string | null): this {
        this.title = title
        return this
    }
    
    public getTitle(): string | null {
        return this.title
    }
    
    public appendModule<Pages extends Record<any, IDocPage<any>>>(module: IDocsModule<Pages>): this {
        this.modules.push(module)
        return this
    }
    
    public getModules(): IDocsModule<any>[] {
        return this.modules
    }
    
    public getJson(): DocsJson {
        return {
            title: this.title,
            modules: new DocsModulesToJsonConverter(this.modules).toJson()
        }
    }
}