import {IModelSqlDynamicRegistry, IModelSql} from '@model'


export class ModelSqlDynamicRegistry<
    Row extends object,
    RowPrimaryKey extends string = 'id',
    RowDateAddKey extends string = 'date_add',
    RowDateUpdateKey extends (string | null) = 'date_update',
> implements IModelSqlDynamicRegistry<Row, RowPrimaryKey, RowDateAddKey, RowDateUpdateKey> {

    private models: IModelSql<Row, {}, RowPrimaryKey, RowDateAddKey, RowDateUpdateKey>[] = []

    public addModel(model: IModelSql<Row, {}, RowPrimaryKey, RowDateAddKey, RowDateUpdateKey>) {
        this.models.push(model)
    }

    public getModels(): IModelSql<Row, {}, RowPrimaryKey, RowDateAddKey, RowDateUpdateKey>[] {
        return this.models
    }
}