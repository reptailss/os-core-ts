import {DockBlockJson, DocModuleJson, TextDocBlockJson} from '@docJson/types'
import {IDocsModule} from '@docModule/interfaces'
import {ICodeBlock, IStepperBlock, ITableBlock, ITitleBlock, TableBlockRow} from '@docBlocks/interfaces'
import {TextBlock} from '@docBlocks/impl/TextBlock'
import {GetDocsCodeFromTemplate} from '@docModule/impl/GetDocsCodeFromTemplate'

export class DocsModulesToJsonConverter {
    
    private readonly getDocsCodeFromTemplate: GetDocsCodeFromTemplate
    
    constructor(
        private modules: IDocsModule<any>[]
    ) {
        this.getDocsCodeFromTemplate = new GetDocsCodeFromTemplate(modules).init()
    }
    
    
    public toJson() {
        return this.modules.map(module => {
            return this.moduleToJson(module)
        })
    }
    
    private moduleToJson(module: IDocsModule<any>): DocModuleJson {
        
        return {
            title: module.getTitle() || '',
            navTitle: module.getNavTitle(),
            pages: module.getPages()?.map((page) => {
                return {
                    title: page.getTitle(),
                    navTitle: page.getNavTitle(),
                    path: page.getPagePath(),
                    blocks: page.getBlocks()?.map((block) => {
                        return this.blockToJson(block)
                    }) || []
                }
            })
        }
    }
    
    private blockToJson(
        block:
            ITitleBlock<string> |
            ICodeBlock<string> |
            IStepperBlock<string> |
            ITableBlock<string, TableBlockRow>
    ): DockBlockJson {
        switch (block.type) {
            case 'title': {
                return {
                    id: this.getRandomId(),
                    type: block.type,
                    title: block.getTitle(),
                    anchor: block.getAnchor(),
                    navTitle: block.getNavTitle(),
                    children: block.getChildren()?.map((child) => {
                        return this.blockToJson(child)
                    }) || [],
                    texts: this.textsToJson(block.getTexts())
                }
            }
            case 'code': {
                return {
                    id: this.getRandomId(),
                    type: block.type,
                    title: block.getTitle(),
                    anchor: block.getAnchor(),
                    navTitle: block.getNavTitle(),
                    children: block.getChildren()?.map((child) => {
                        return this.blockToJson(child)
                    }) || [],
                    texts: this.textsToJson(block.getTexts()),
                    code: this.getDocsCodeFromTemplate.getCodeFromTemplateFilePath(block.getTemplateFilePath()),
                    fileName: block.getFileName()
                    
                }
            }
            case 'stepper': {
                return {
                    id: this.getRandomId(),
                    type: block.type,
                    title: block.getTitle(),
                    anchor: block.getAnchor(),
                    navTitle: block.getNavTitle(),
                    children: block.getChildren()?.map((child) => {
                        return this.blockToJson(child)
                    }),
                    texts: this.textsToJson(block.getTexts()),
                    steps: block.getSteeps()?.map((steep) => {
                        return {
                            id: this.getRandomId(),
                            type: steep.type,
                            title: steep.getTitle(),
                            anchor: steep.getAnchor(),
                            navTitle: steep.getNavTitle(),
                            children: steep.getChildren()?.map((child) => {
                                return this.blockToJson(child)
                            }) || [],
                            texts: this.textsToJson(steep.getTexts()),
                            showInNavigation: steep.isShownInNavigation()
                        }
                    }) || []
                }
            }
            case 'table': {
                return {
                    id: this.getRandomId(),
                    type: block.type,
                    title: block.getTitle() || '',
                    anchor: block.getAnchor(),
                    navTitle: block.getNavTitle(),
                    children: block.getChildren()?.map((child) => {
                        return this.blockToJson(child)
                    }) || [],
                    texts: this.textsToJson(block.getTexts()),
                    columns: block.getColumns(),
                    data: block.getRows()?.map((row) => {
                        const newRow: Record<string, string | TextDocBlockJson> = {}
                        for (const key in row) {
                            const value = row[key]
                            if (typeof value === 'string') {
                                newRow[key] = value
                            } else {
                                newRow[key] = this.textToJson(value as TextBlock)
                            }
                            
                        }
                        return newRow
                    })
                    
                }
            }
        }
    }
    
    private getRandomId(): string {
        return Math.random().toString(36).substring(2, 4 + 2)
    }
    
    private textsToJson(texts: TextBlock[]): TextDocBlockJson[] {
        return texts.map((text) => {
            return this.textToJson(text)
        })
    }
    
    private textToJson(text: TextBlock): TextDocBlockJson {
        return {
            texts: text.getTexts().map((text) => {
                if (text.hasCodeReplaces) {
                    return {
                        text: this.getDocsCodeFromTemplate.replaceTemplate(text.text),
                        isLink: text.isLink,
                        link: text.link,
                        isPrimary: text.isPrimary,
                        id: this.getRandomId(),
                        isCodeLink: true
                    }
                }
                return {
                    text: text.text,
                    isLink: text.isLink,
                    link: text.link,
                    isPrimary: text.isPrimary,
                    id: this.getRandomId(),
                    isCodeLink: false
                }
            }),
            variant: text.getVariant(),
            type: text.type
            
        }
    }
}