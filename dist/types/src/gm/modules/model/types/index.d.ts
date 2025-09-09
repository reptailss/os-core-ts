import { GmModelNoSqlColumn, GmModelSqlColumn } from "../../..";
export interface GmGenerateColumnModelSql {
    key: string;
    column: GmModelSqlColumn;
}
export interface GmGenerateColumnModelNoSql {
    key: string;
    column: GmModelNoSqlColumn;
}
