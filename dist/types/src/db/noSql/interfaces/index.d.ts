import { ModelNoSqlColumns, IModelNoSql, NoSqlIndexes, SettingsLoadModelNoSql } from "../../../model";
export interface IDbConnectionNoSql {
    defineModel<Row extends object, RowDateAddKey extends (string | null) = 'date_add', RowDateUpdateKey extends (string | null) = 'date_update'>({ columns, collectionName, options, }: {
        collectionName: string;
        columns: ModelNoSqlColumns<Row, RowDateAddKey, RowDateUpdateKey>;
        options?: SettingsLoadModelNoSql<RowDateAddKey, RowDateUpdateKey>;
        indexes?: NoSqlIndexes<Row, RowDateAddKey, RowDateUpdateKey>;
    }): IModelNoSql<Row, RowDateAddKey, RowDateUpdateKey>;
}
