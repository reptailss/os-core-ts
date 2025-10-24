import {ITableBlock, TableBlockRow} from '@docBlocks/interfaces'
import {DocBlock} from '@docBlocks/impl/DocBlock'


export class TableBlock<Name extends string, Row extends TableBlockRow> extends DocBlock<Name> implements ITableBlock<Name, Row> {
    public type = 'table' as const
    
    private columns: {
        title: string
        key: keyof Row & string
    }[] = []
    private rows: Row[] = []
    
    public appendColumn(column: {
        title: string
        key: keyof Row & string
    }): this {
        this.columns.push(column)
        return this
    }
    
    public getColumns(): {
        title: string
        key: keyof Row & string
    }[] {
        return this.columns
    }
    
    public appendRow(row: Row): this {
        this.rows.push(row)
        return this
    }
    
    public appendRows(rows: Row[]): this {
        this.rows.push(...rows)
        return this
    }
    
    public getRows(): Row[] {
        return this.rows
    }
    
}