import { ConfigModelNoSql, CreateAttrRowModelNoSql, FindOptionUpdateRowModelNoSql, PropsCountModelNoSql, PropsDeleteManyRowsModelNoSql, PropsDeleteRowModelNoSql, PropsFindAllModelNoSql, PropsFindByPkModelNoSql, PropsFindOneModelNoSql, ResultFindAllModelNoSql, ResultFindByPkModelNoSql, ResultFindOneModelNoSql, RowWithBaseFieldsModelNoSql } from "../../core";
export interface IModelNoSql<Row extends object, RowDateAddKey extends (string | null) = 'date_add', RowDateUpdateKey extends (string | null) = 'date_update'> {
    create(row: CreateAttrRowModelNoSql<Row, RowDateAddKey, RowDateUpdateKey>): Promise<RowWithBaseFieldsModelNoSql<Row, RowDateAddKey, RowDateUpdateKey>>;
    createMany(rows: CreateAttrRowModelNoSql<Row, RowDateAddKey, RowDateUpdateKey>[]): Promise<number>;
    update(row: Partial<Row>, options: FindOptionUpdateRowModelNoSql<Row, RowDateAddKey, RowDateUpdateKey, undefined>): Promise<void>;
    update(row: Partial<Row>, options: FindOptionUpdateRowModelNoSql<Row, RowDateAddKey, RowDateUpdateKey, true>): Promise<RowWithBaseFieldsModelNoSql<Row, RowDateAddKey, RowDateUpdateKey>>;
    update(row: Partial<Row>, options: FindOptionUpdateRowModelNoSql<Row, RowDateAddKey, RowDateUpdateKey, false>): Promise<void>;
    destroy(props: PropsDeleteRowModelNoSql<Row, RowDateAddKey, RowDateUpdateKey>): Promise<number>;
    destroyMany(props: PropsDeleteManyRowsModelNoSql<Row, RowDateAddKey, RowDateUpdateKey>): Promise<number>;
    count(props?: PropsCountModelNoSql<Row, RowDateAddKey, RowDateUpdateKey>): Promise<number>;
    findAll<ReturnAttributes extends Array<keyof RowWithBaseFieldsModelNoSql<Row, RowDateAddKey, RowDateUpdateKey>> | undefined = undefined>(props?: PropsFindAllModelNoSql<Row, RowDateAddKey, RowDateUpdateKey, ReturnAttributes>): Promise<ResultFindAllModelNoSql<Row, RowDateAddKey, RowDateUpdateKey, ReturnAttributes>>;
    findOne<ReturnAttributes extends Array<keyof RowWithBaseFieldsModelNoSql<Row, RowDateAddKey, RowDateUpdateKey>> | undefined = undefined>(options: PropsFindOneModelNoSql<Row, RowDateAddKey, RowDateUpdateKey, ReturnAttributes>): Promise<ResultFindOneModelNoSql<Row, RowDateAddKey, RowDateUpdateKey, ReturnAttributes>>;
    findByPk<ReturnAttributes extends Array<keyof RowWithBaseFieldsModelNoSql<Row, RowDateAddKey, RowDateUpdateKey>> | undefined = undefined>(key: number | string, options?: PropsFindByPkModelNoSql<Row, RowDateAddKey, RowDateUpdateKey, ReturnAttributes>): Promise<ResultFindByPkModelNoSql<Row, RowDateAddKey, RowDateUpdateKey, ReturnAttributes>>;
    getConfig(): ConfigModelNoSql;
    syncIndexes(): Promise<void>;
    dropCollection(): Promise<void>;
}
