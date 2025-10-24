import {
    AllowedDocBlock,
    ICodeBlock,
    IStepperBlock,
    ITableBlock,
    ITitleBlock,
    TableBlockRow
} from '@docBlocks/interfaces'


export interface IDocPage<BlockNames extends readonly string[] = []> {
    blockNames: BlockNames
    
    setTitle(title: string): this
    
    getTitle(): string
    
    getNavTitle(): string | null
    
    setNavTitle(title: string | null): this
    
    getPagePath(): string
    
    getBlocks(): Array<
        ITitleBlock<BlockNames[number]> |
        ICodeBlock<BlockNames[number]> |
        IStepperBlock<BlockNames[number]> |
        ITableBlock<BlockNames[number], TableBlockRow>
    >
    
    appendBlock(block: AllowedDocBlock<BlockNames>): this
    
    getBlock<BlockName extends BlockNames[number]>(blockName: BlockName):
        ITitleBlock<BlockName> |
        ICodeBlock<BlockName> |
        IStepperBlock<BlockName> |
        ITableBlock<BlockName, TableBlockRow>
    
    getBlockPath(blockName: BlockNames[number]): string
    
    getBlockTitle(blockName: BlockNames[number]): string
    
    init(): void
    
}