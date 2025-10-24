import {IDocsModule} from '@docModule/interfaces'

export class GetDocsCodeFromTemplate {
    
    private templates: Record<string, string> = {}
    private counter: number = 0
    
    constructor(private readonly modules: IDocsModule<any>[]) {
    }
    
    public init(): this {
        if (!this.modules.length) {
            return this
        }
        this.modules.forEach(module => {
            if (module.getPages().length) {
                module.getPages().forEach(page => {
                    if (page.getBlocks().length) {
                        page.getBlocks().forEach(block => {
                            this.counter++
                            const id = `${page.getTitle()}_${block.getAnchor()}_link_${this.counter}`
                            this.templates[block.getTitle()] = `#linkModule(${id},${block.getTitle()},${page.getTitle()},${block.getAnchor()}#)`
                            if (block.type === 'stepper' && block.getSteeps().length) {
                                block.getSteeps().forEach(steep => {
                                    if (!steep.isLinkReplacementEnabled()) {
                                        return
                                    }
                                    this.counter++
                                    const id = `${page.getTitle()}_${steep.getAnchor()}_link_${this.counter}`
                                    this.templates[steep.getTitle()] = `#linkModule(${id},${steep.getTitle()},${page.getTitle()},${steep.getAnchor()}#)`
                                })
                            }
                        })
                    }
                })
            }
        })
        return this
    }
    
    public getCodeFromTemplateFilePath(templateFilePath: string): string {
        return this.replaceTemplate(require(`../../../templates/${templateFilePath}`).default)
        
    }
    
    public replaceTemplate(template: string): string {
        return Object.keys(this.templates).reduce((result, key) => {
            const regex = new RegExp(`\\{\\{${key}\\}\\}`, 'g')
            return result.replace(regex, this.templates[key])
        }, template)
    }
    
}

