import { ModelSqlColumns, IModelSql, SettingsLoadModelSql } from "../../../model";
import { SqlAggregate, SqlAssociation, SqlAssociationRow, ConfigModelSql, CreateAttrRowModelSql, FindOptionUpdateManyRowModelSql, FindOptionUpdateRowModelSql, OptionsPaginationModelSql, PropsCountModelSql, PropsDeleteRowModelSql, PropsFindAllModelSql, PropsFindByPkModelSql, PropsFindOneModelSql, ResultFindAllModelSql, ResultFindByPkModelSql, ResultFindOneModelSql, RowWithAggregatesModelSql, RowWithBaseFieldsAndAttributesModelSql, RowWithBaseFieldsModelSql, RowWithIncludeModelSql, SqlIndexes } from "../../../model/core";
import { PaginationQueryParams, PaginationValues } from "../../../pagination";
import { Model, ModelStatic, Sequelize } from 'sequelize';
type ModelSequelize<T extends object = any, A extends object = any> = ModelStatic<Model<T, A>>;
export declare class ModelSql<Row extends object, Includes extends Record<string, SqlAssociation<any>> = {}, RowPrimaryKey extends string = 'id', RowDateAddKey extends (string | null) = 'date_add', RowDateUpdateKey extends (string | null) = 'date_update'> implements IModelSql<Row, Includes, RowPrimaryKey, RowDateAddKey, RowDateUpdateKey> {
    readonly _row: Row;
    private _includes;
    private readonly columns;
    private readonly dbConnectionSqlModelQueryBuilder;
    private readonly model;
    private readonly dbConnection;
    private readonly tableName;
    private readonly settings?;
    private extraData;
    constructor(dbConnection: Sequelize, tableName: string, columns: ModelSqlColumns<Row, RowPrimaryKey, RowDateAddKey, RowDateUpdateKey>, options?: SettingsLoadModelSql<RowPrimaryKey, RowDateAddKey, RowDateUpdateKey>, includes?: Includes, indexes?: SqlIndexes<Row, RowPrimaryKey, RowDateAddKey, RowDateUpdateKey>);
    getIncludes(): Includes;
    getColumns(): ModelSqlColumns<Row, RowPrimaryKey, RowDateAddKey, RowDateUpdateKey>;
    create(row: CreateAttrRowModelSql<Row, RowPrimaryKey, RowDateAddKey, RowDateUpdateKey>): Promise<RowWithBaseFieldsModelSql<Row, RowPrimaryKey, RowDateAddKey, RowDateUpdateKey>>;
    private createRow;
    update(row: Partial<Row>, options: FindOptionUpdateRowModelSql<Row, RowPrimaryKey, RowDateAddKey, RowDateUpdateKey, true>): Promise<RowWithBaseFieldsModelSql<Row, RowPrimaryKey, RowDateAddKey, RowDateUpdateKey>>;
    update(row: Partial<Row>, options: FindOptionUpdateRowModelSql<Row, RowPrimaryKey, RowDateAddKey, RowDateUpdateKey, false>): Promise<void>;
    updateMany(row: Partial<Row>, options: FindOptionUpdateManyRowModelSql<Row, RowPrimaryKey, RowDateAddKey, RowDateUpdateKey, true>): Promise<RowWithBaseFieldsModelSql<Row, RowPrimaryKey, RowDateAddKey, RowDateUpdateKey>[]>;
    updateMany(row: Partial<Row>, options: FindOptionUpdateManyRowModelSql<Row, RowPrimaryKey, RowDateAddKey, RowDateUpdateKey, false>): Promise<number>;
    destroy(props: PropsDeleteRowModelSql<Row, RowPrimaryKey, RowDateAddKey, RowDateUpdateKey>): Promise<number>;
    findAll<ReturnAttributes extends Array<keyof RowWithBaseFieldsModelSql<Row, RowPrimaryKey, RowDateAddKey, RowDateUpdateKey>> | undefined = undefined, Incl extends Array<SqlAssociationRow<Includes>> = [], Aggregates extends Record<string, SqlAggregate<Row>> = {}>(option?: PropsFindAllModelSql<Row, RowPrimaryKey, RowDateAddKey, RowDateUpdateKey, ReturnAttributes, Includes, Incl, Aggregates>): Promise<ResultFindAllModelSql<Row, RowPrimaryKey, RowDateAddKey, RowDateUpdateKey, ReturnAttributes, Includes, Incl, Aggregates>>;
    count<Incl extends Array<SqlAssociationRow<Includes>> = []>(option?: PropsCountModelSql<Row, RowPrimaryKey, RowDateAddKey, RowDateUpdateKey, Includes, Incl>): Promise<number>;
    findOne<ReturnAttributes extends Array<keyof RowWithBaseFieldsModelSql<Row, RowPrimaryKey, RowDateAddKey, RowDateUpdateKey>> | undefined = undefined, Aggregates extends Record<string, SqlAggregate<Row>> = {}>(option: PropsFindOneModelSql<Row, RowPrimaryKey, RowDateAddKey, RowDateUpdateKey, ReturnAttributes, Aggregates>): Promise<ResultFindOneModelSql<Row, RowPrimaryKey, RowDateAddKey, RowDateUpdateKey, ReturnAttributes, Aggregates>>;
    findByPk<ReturnAttributes extends Array<keyof RowWithBaseFieldsModelSql<Row, RowPrimaryKey, RowDateAddKey, RowDateUpdateKey>> | undefined = undefined>(key: number | string, option?: PropsFindByPkModelSql<Row, RowPrimaryKey, RowDateAddKey, RowDateUpdateKey, ReturnAttributes>): Promise<ResultFindByPkModelSql<Row, RowPrimaryKey, RowDateAddKey, RowDateUpdateKey, ReturnAttributes>>;
    pagination<ReturnAttributes extends Array<keyof RowWithBaseFieldsModelSql<Row, RowPrimaryKey, RowDateAddKey, RowDateUpdateKey>> | undefined = undefined, Incl extends Array<SqlAssociationRow<Includes>> = [], Aggregates extends Record<string, SqlAggregate<Row>> = {}>(params?: PaginationQueryParams<RowWithBaseFieldsModelSql<Row, RowPrimaryKey, RowDateAddKey, RowDateUpdateKey>>, options?: OptionsPaginationModelSql<Row, RowPrimaryKey, RowDateAddKey, RowDateUpdateKey, ReturnAttributes, Includes, Incl, Aggregates>): Promise<PaginationValues<RowWithAggregatesModelSql<RowWithIncludeModelSql<RowWithBaseFieldsAndAttributesModelSql<Row, RowPrimaryKey, RowDateAddKey, RowDateUpdateKey, ReturnAttributes>, Pick<Includes, Incl[number]['modelKey']>>, Aggregates>>>;
    getConfig(): ConfigModelSql;
    _getRawModel(): ModelSequelize<Row>;
    hasOne(model: ModelSql<object>, options: {
        foreignKey: string;
        onDelete?: 'RESTRICT' | 'SET_NULL' | 'CASCADE';
    }): this;
    hasMany(model: ModelSql<object>, options: {
        foreignKey: string;
        onDelete?: 'RESTRICT' | 'SET_NULL' | 'CASCADE';
    }): this;
    belongsTo(model: ModelSql<object>, options: {
        foreignKey: string;
    }): this;
    query<T>(value: string, options?: {
        replacements?: Record<string, string | number>;
    }): Promise<T[]>;
    syncModel(): Promise<void>;
    getExtraData(key: string): string | null;
    saveExtraData(key: string, value: string): this;
    private buildEmptyPagination;
}
export {};
