import {
    AllowedDocBlock,
    ICodeBlock,
    IStepperBlock,
    ITableBlock,
    ITitleBlock,
    TableBlockRow
} from '@docBlocks/interfaces'
import {IDocPage} from '@docPage/interfaces'


export abstract class AbstractDocPage<BlockNames extends readonly string[]> implements IDocPage<BlockNames> {
    public blockNames!: BlockNames
    
    private navTitle: string | null = null
    private title: string = ''
    
    private blocks: Array<
        ITitleBlock<BlockNames[number]> |
        ICodeBlock<BlockNames[number]> |
        IStepperBlock<BlockNames[number]> |
        ITableBlock<BlockNames[number], TableBlockRow>
    > = []
    
    
    abstract init(): void
    
    public setTitle(title: string): this {
        this.title = title
        return this
    }
    
    public getTitle(): string {
        return this.title
    }
    
    public getPagePath(): string {
        return this.title.replace(/\s+/g, '')
    }
    
    public setNavTitle(title: string | null): this {
        this.navTitle = title
        return this
    }
    
    public getNavTitle(): string | null {
        return this.navTitle
    }
    
    public appendBlock(block: AllowedDocBlock<BlockNames>): this {
        block.setPagePath(this.getPagePath())
        this.blocks.push(block as any)
        return this
    }
    
    public getBlocks(): Array<
        ITitleBlock<BlockNames[number]> |
        ICodeBlock<BlockNames[number]> |
        IStepperBlock<BlockNames[number]> |
        ITableBlock<BlockNames[number], TableBlockRow>
    > {
        return this.blocks
    }
    
    getBlock<BlockName extends BlockNames[number]>(blockName: BlockName):
        ITitleBlock<BlockName> |
        ICodeBlock<BlockName> |
        IStepperBlock<BlockName> |
        ITableBlock<BlockName, TableBlockRow> {
        const block = this.blocks.find((block) => block.getTitle() === blockName)
        
        if (!block) {
            throw new Error(`Unknown block ${blockName}`)
        }
        return block as
            ITitleBlock<BlockName> |
            ICodeBlock<BlockName> |
            IStepperBlock<BlockName> |
            ITableBlock<BlockName, TableBlockRow>
    }
    
    public getBlockPath(blockName: BlockNames[number]): string {
        const block = this.blocks.find((block) => block.getTitle() === blockName)
        if (!block) {
            return ''
        }
        return `${block.getPagePath()}/#${block.getAnchor()}`
    }
    
    public getBlockTitle(blockName: BlockNames[number]): string {
        const block = this.blocks.find((block) => block.getTitle() === blockName)
        if (!block) {
            return ''
        }
        return block.getTitle()
    }
}