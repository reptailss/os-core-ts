import { IModelSqlDynamicRegistry, IModelSql } from "../..";
export declare class ModelSqlDynamicRegistry<Row extends object, RowPrimaryKey extends string = 'id', RowDateAddKey extends string = 'date_add', RowDateUpdateKey extends (string | null) = 'date_update'> implements IModelSqlDynamicRegistry<Row, RowPrimaryKey, RowDateAddKey, RowDateUpdateKey> {
    private models;
    addModel(model: IModelSql<Row, {}, RowPrimaryKey, RowDateAddKey, RowDateUpdateKey>): void;
    getModels(): IModelSql<Row, {}, RowPrimaryKey, RowDateAddKey, RowDateUpdateKey>[];
}
