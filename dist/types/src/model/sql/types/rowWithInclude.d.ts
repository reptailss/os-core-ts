import { SqlAssociation } from "../../core";
export type RowWithIncludeModelSql<Row extends object, Includes extends Record<string, SqlAssociation<any>> | undefined> = Includes extends undefined ? Row : Row & {
    [K in keyof Includes]: Includes[K] extends SqlAssociation<infer IncludedRow> ? Includes[K]['type'] extends 'hasMany' ? Array<Includes[K]['_row']> : Includes[K]['_row'] : never;
};
