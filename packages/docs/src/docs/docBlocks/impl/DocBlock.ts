import {ICodeBlock, IDocBlock, IStepperBlock, ITableBlock, ITitleBlock, TableBlockRow} from '@docBlocks/interfaces'
import {TextBlock} from '@docBlocks/impl/TextBlock'

export class DocBlock<Name extends string> implements IDocBlock<Name> {
    readonly title: Name
    private navTitle: string | null = null
    private anchor: string | null = null
    private children: Array<
        ITitleBlock<string> |
        ICodeBlock<string> |
        IStepperBlock<string> |
        ITableBlock<string, TableBlockRow>
    > = []
    private texts: TextBlock[] = []
    private pagePath: string = ''
    
    constructor(title: Name) {
        this.title = title
    }
    
    public getTitle(): Name {
        return this.title
    }
    
    public setNavTitle(navTitle: string | null): this {
        this.navTitle = navTitle
        return this
    }
    
    public getNavTitle(): string | null {
        return this.navTitle
    }
    
    public setAnchor(anchor: string): this {
        this.anchor = anchor
        return this
    }
    
    public getAnchor(): string {
        return (this.anchor || this.navTitle || this.title).replace(/\s+/g, '')
    }
    
    public appendText(text: TextBlock): this {
        this.texts.push(text)
        return this
    }
    
    public getTexts(): TextBlock[] {
        return this.texts
    }
    
    public appendChildren<ChildName extends string>(
        children:
            ITitleBlock<ChildName> |
            ICodeBlock<ChildName> |
            IStepperBlock<ChildName> |
            ITableBlock<ChildName, TableBlockRow>,
    ): this {
        this.children.push(children)
        return this
    }
    
    public getChildren(): Array<
        ITitleBlock<string> |
        ICodeBlock<string> |
        IStepperBlock<string> |
        ITableBlock<string, TableBlockRow>
    > {
        return this.children
    }
    
    public setPagePath(pagePath: string): this {
        this.pagePath = pagePath
        return this
    }
    
    public getPagePath(): string {
        return this.pagePath
    }
    
    public getBlockPath(): string {
        return `${this.getPagePath()}/#${this.getAnchor()}`
    }
}