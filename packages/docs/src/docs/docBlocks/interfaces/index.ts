import {TextBlock} from '@docBlocks/impl/TextBlock'
import {ITextBlock} from '@docBlocks/interfaces/ITextBlock'

export type AllowedDocBlock<BlockNames extends readonly string[]> = IDocBlock<BlockNames[number]>

export interface IDocBlock<Name extends string> {
    
    getTitle(): Name
    
    setNavTitle(navTitle: string | null): this
    
    getNavTitle(): string | null
    
    setAnchor(anchor: string): this
    
    getAnchor(): string
    
    appendText(text: TextBlock): this
    
    getTexts(): TextBlock[]
    
    appendChildren<ChildName extends string>(
        children:
            ITitleBlock<ChildName> |
            ICodeBlock<ChildName> |
            IStepperBlock<ChildName> |
            ITableBlock<ChildName, TableBlockRow>,
    ): this
    
    getChildren(): Array<
        ITitleBlock<string> |
        ICodeBlock<string> |
        IStepperBlock<string> |
        ITableBlock<string, TableBlockRow>
    >
    
    setPagePath(pagePath: string): this
    
    getPagePath(): string
    
    getBlockPath(): string
    
}

export interface ITitleBlock<Name extends string> extends IDocBlock<Name> {
    type: 'title'
}

export interface ICodeBlock<Name extends string> extends IDocBlock<Name> {
    type: 'code'
    
    setHeaderTitle(fileName:string | null): this
    
    getFileName(): string | null
    
    
    getTemplateFilePath(): string
    
}


export type TableBlockRow = Record<string, string | ITextBlock>

export interface ITableBlock<Name extends string, Row extends TableBlockRow> extends IDocBlock<Name> {
    type: 'table'
    
    appendColumn(column: {
        title: string
        key: keyof Row
    }): this
    
    getColumns(): {
        title: string
        key: keyof Row
    }[]
    
    appendRow(row: Row): this
    
    appendRows(rows: Row[]): this
    
    getRows(): Row[]
}

export interface IStepBlock extends IDocBlock<string> {
    type: 'step'
    
    enableLinkReplacement():this
    
    isLinkReplacementEnabled():boolean
    
    showInNavigation(): this
    
    isShownInNavigation(): boolean
    
    
}

export interface IStepperBlock<Name extends string> extends IDocBlock<Name> {
    type: 'stepper'
    
    appendSteep(steep: IStepBlock): this
    
    getSteeps(): IStepBlock[]
    
}