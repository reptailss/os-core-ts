import {IDocsModule} from '@docModule/interfaces'
import {IDocPage} from '@docPage/interfaces'
import {AbstractDocPage} from '@docPage/abstract/AbstractDocPage'

export class DocsModule<Pages extends {[pageName: string]: AbstractDocPage<any>}> implements IDocsModule<Pages> {
    
    private title: string | null = null
    private navTitle: string | null = null
    private pages: Pages = {} as Pages
    
    constructor(pages: Pages) {
        for (const pageName in pages) {
            this.pages[pageName] = pages[pageName].setTitle(pageName)
            this.pages[pageName].init()
        }
    }
    
    public getPageBlockPath<
        PageName extends keyof Pages,
        BlockName extends Pages[PageName]['blockNames'][number]
    >(
        pageName: PageName,
        blockName: BlockName
    ):string {
        return this.pages[pageName].getBlockPath(blockName)
    }
    
    public getPageBlockTitle<
        PageName extends keyof Pages,
        BlockName extends Pages[PageName]['blockNames'][number]
    >(
        pageName: PageName,
        blockName: BlockName
    ):string {
        return this.pages[pageName].getBlockTitle(blockName)
    }
    
    public getBlockPathAndTitle<
        PageName extends keyof Pages,
        BlockName extends Pages[PageName]['blockNames'][number]
    >(
        pageName: PageName,
        blockName: BlockName
    ): {
        path: string,
        title: string
    } {
        return {
            path: this.getPageBlockPath(pageName, blockName),
            title: this.getPageBlockTitle(pageName, blockName)
        }
    }
    
    public setTitle(title: string | null): this {
        this.title = title
        return this
    }
    
    public getTitle(): string | null {
        return this.title
    }
    
    public setNavTitle(navTitle: string | null): this {
        this.navTitle = navTitle
        return this
    }
    
    public getNavTitle(): string | null {
        return this.navTitle
    }
    
    public getPages(): IDocPage<string[]>[] {
        return Object.values(this.pages)
    }
}