import {IDocPage} from '@docPage/interfaces'

export interface IDocsModule<Pages extends {[pageName: string]: IDocPage<any>}> {
    setTitle(title: string | null): this
    
    getTitle(): string | null
    
    setNavTitle(title:string | null): this
    
    getNavTitle(): string | null
    
    getPages(): IDocPage<any>[]
    
    getPageBlockPath<
        PageName extends keyof Pages,
        BlockName extends Pages[PageName]['blockNames'][number]
    >(
        pageName: PageName,
        name: BlockName
    ): string
    
    getPageBlockTitle<
        PageName extends keyof Pages,
        BlockName extends Pages[PageName]['blockNames'][number]
    >(
        pageName: PageName,
        name: BlockName
    ): string
    
    getBlockPathAndTitle<
        PageName extends keyof Pages,
        BlockName extends Pages[PageName]['blockNames'][number]
    >(
        pageName: PageName,
        name: BlockName
    ): {
        path: string
        title: string
    }
    
}
