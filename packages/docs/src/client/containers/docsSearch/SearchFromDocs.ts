import {DockBlockJson, DocsJson, TextDocBlockJson} from '@docJson/types'
import {ContentSearchResult, SearchResult} from '@docsSearch/types'
import {RandomHelper} from '@helpers/RandomHelper'


const START_SRT_LENGTH = 50
const END_SRT_LENGTH = 90

export class SearchFromDocs {
    
    
    static search(
        searchValue: string,
        docsJson: DocsJson
    ): SearchResult[] {
        if (!docsJson.modules?.length || !searchValue.length) {
            return []
        }
        const results: SearchResult[] = []
        
        docsJson.modules.forEach(module => {
            if (module.pages.length) {
                module.pages.forEach(page => {
                    if (page.blocks.length) {
                        const content: ContentSearchResult[] = this.getContentsByBlocks({
                            blocks: page.blocks,
                            searchValue,
                            pagePath: page.path
                        })
                        if (!content?.length) {
                            return
                        }
                        results.push({
                            title: page.title,
                            path: page.path,
                            subtitle: page.title,
                            content,
                            id: RandomHelper.getString()
                        })
                    }
                    
                })
            }
            
        })
        return results
    }
    
    private static getContentsByBlocks({
                                           blocks,
                                           searchValue,
                                           pagePath
                                       }: {
        blocks: DockBlockJson[]
        searchValue: string
        pagePath: string
    }) {
        if (!blocks?.length) {
            return []
        }
        const content: ContentSearchResult[] = []
        
        blocks.forEach((block) => {
            const contentsByBlock = this.getContentByBlock({
                block,
                searchValue,
                pagePath
            })
            if (contentsByBlock.length >= 1) {
                content.push(...contentsByBlock)
            }
            if (block.children && block.children.length >= 1) {
                const childContent: ContentSearchResult[] = []
                block.children.forEach((childBlock) => {
                    const contentsByChildBlock = this.getContentByBlock({
                        block: childBlock,
                        searchValue,
                        parentAnchor: block.anchor,
                        parentNavTitle: block.navTitle,
                        pagePath
                    })
                    if (contentsByChildBlock.length >= 1) {
                        childContent.push(...contentsByChildBlock)
                    }
                })
                if (childContent.length >= 1) {
                    content.push(...childContent)
                }
            }
            
        })
        return content
    }
    
    private static getContentByBlock({
                                         block,
                                         searchValue,
                                         parentAnchor,
                                         parentNavTitle,
                                         pagePath
                                     }: {
        block: DockBlockJson
        pagePath: string
        searchValue: string
        parentAnchor?: string | null
        parentNavTitle?: string | null
    }): ContentSearchResult[] {
        const content: ContentSearchResult[] = []
        const contentResult = this.getContentSearchResult({
            path: pagePath,
            anchor: block.anchor,
            searchValue,
            value: block.title || null,
            subTitle: block.navTitle
        })
        
        if (block.texts.length) {
            block.texts.forEach(text => {
                if (text.texts.length) {
                    text.texts.forEach(textBlock => {
                        const contentResult = this.getContentSearchResult({
                            path: pagePath,
                            anchor: block.anchor,
                            searchValue,
                            value: textBlock.text,
                            subTitle: block.navTitle
                        })
                        if (contentResult) {
                            content.push(contentResult)
                        }
                    })
                }
                
            })
        }
        
        if (contentResult) {
            content.push(contentResult)
        }
        if (block.type === 'stepper') {
            block.steps.forEach((steep) => {
                const contentResult = this.getContentSearchResult({
                    path: pagePath,
                    anchor: steep.anchor,
                    searchValue,
                    value: 'title' in steep && typeof steep.title === 'string' ? steep.title : null,
                    subTitle: steep.navTitle
                })
                if (contentResult) {
                    content.push(contentResult)
                }
                if (steep.texts.length >= 1) {
                    steep.texts.forEach(text => {
                        if (text.texts.length) {
                            text.texts.forEach(textBlock => {
                                const contentResult = this.getContentSearchResult({
                                    path: pagePath,
                                    anchor: steep.anchor,
                                    searchValue,
                                    value: textBlock.text,
                                    subTitle: steep.navTitle
                                })
                                if (contentResult) {
                                    content.push(contentResult)
                                }
                            })
                        }
                        
                    })
                }
                
            })
        }
        if (block.type === 'table') {
            if (block.data.length) {
                block.data.forEach((row) => {
                    for (const key in row) {
                        const value: TextDocBlockJson | string = row[key]
                        if (typeof value === 'string') {
                            const contentResult = this.getContentSearchResult({
                                path: pagePath,
                                anchor: block.anchor || parentAnchor,
                                searchValue,
                                value: row[key],
                                subTitle: `${block?.navTitle || parentNavTitle || ''} ${block.columns.find((col) => col.key === key)?.title}(Таблиця)`
                            })
                            if (contentResult) {
                                content.push(contentResult)
                            }
                        } else {
                            if (value?.texts?.length >= 1) {
                                value.texts.forEach((text) => {
                                    const contentResult = this.getContentSearchResult({
                                        path: pagePath,
                                        anchor: block.anchor || parentAnchor,
                                        searchValue,
                                        value: text.text,
                                        subTitle: `${block?.navTitle || parentNavTitle || ''} ${block.columns.find((col) => col.key === key)?.title}(Таблиця)`
                                    })
                                    if (contentResult) {
                                        content.push(contentResult)
                                    }
                                })
                            }
                        }
                        
                    }
                    
                })
            }
            
        }
        return content
    }
    
    private static getContentSearchResult({
                                              searchValue,
                                              path,
                                              value,
                                              subTitle,
                                              anchor
                                          }: {
        searchValue: string,
        value?: string | null
        path?: string | null
        anchor?: string | null
        subTitle?: string | null
    }): ContentSearchResult | null {
        
        if (!path || !value || !(this.searchFn(searchValue, value))) {
            return null
        }
        const {
            before,
            match,
            after
        } = this.getSurroundingText(searchValue, value)
        
        return {
            before,
            match,
            after,
            subtitle: subTitle,
            path: anchor ? `${path}#${anchor}` : path
        }
    }
    
    private static searchFn(searchValue: string, value: string) {
        return value?.toLowerCase().includes(searchValue?.toLowerCase().trim())
    }
    
    private static getSurroundingText(
        searchValue: string,
        value: string
    ): {before: string; match: string; after: string} {
        const index = value.toLowerCase().indexOf(searchValue.toLowerCase())
        const before = value.slice(Math.max(0, index - START_SRT_LENGTH), index)
        const match = value.slice(index, index + searchValue.length)
        const after = value.slice(index + searchValue.length, index + searchValue.length + END_SRT_LENGTH)
        
        return {
            before: before ? index > 0 ? `...${before}` : before : '',
            match,
            after: after ? `${after}...` : ''
        }
    }
    
}