import {GmModelNoSqlColumn, GmModelSqlColumn} from '@gm'


export interface GmGenerateColumnModelSql {
    key: string,
    column: GmModelSqlColumn
}

export interface GmGenerateColumnModelNoSql {
    key: string,
    column: GmModelNoSqlColumn
}
