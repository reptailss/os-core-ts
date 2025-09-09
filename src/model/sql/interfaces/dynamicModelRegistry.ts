import {IModelSql} from '@model'

export interface IModelSqlDynamicRegistry<
    Row extends object,
    RowPrimaryKey extends string = 'id',
    RowDateAddKey extends (string | null) = 'date_add',
    RowDateUpdateKey extends (string | null) = 'date_update',
> {
    addModel(model: IModelSql<Row, {}, RowPrimaryKey, RowDateAddKey, RowDateUpdateKey>): void

    getModels(): IModelSql<Row, {}, RowPrimaryKey, RowDateAddKey, RowDateUpdateKey>[]
}