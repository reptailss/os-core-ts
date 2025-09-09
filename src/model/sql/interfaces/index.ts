import {ModelSqlColumns} from '@model'
import {
    ConfigModelSql,
    CreateAttrRowModelSql,
    FindOptionUpdateManyRowModelSql,
    FindOptionUpdateRowModelSql,
    OptionsPaginationModelSql,
    PropsCountModelSql,
    PropsDeleteRowModelSql,
    PropsFindAllModelSql,
    PropsFindByPkModelSql,
    PropsFindOneModelSql,
    ResultFindAllModelSql,
    ResultFindByPkModelSql,
    ResultFindOneModelSql,
    RowWithAggregatesModelSql,
    RowWithBaseFieldsAndAttributesModelSql,
    RowWithBaseFieldsModelSql,
    RowWithIncludeModelSql,
    SqlAggregate,
    SqlAssociation,
    SqlAssociationRow,
} from '@model/core'

import {PaginationQueryParams, PaginationValues} from '@pagination'


export interface IModelSql<
    Row extends object,
    Includes extends Record<string, SqlAssociation<any>> = {},
    RowPrimaryKey extends string = 'id',
    RowDateAddKey extends (string | null) = 'date_add',
    RowDateUpdateKey extends (string | null) = 'date_update',
> {
    create(
        row: CreateAttrRowModelSql<
            Row,
            RowPrimaryKey,
            RowDateAddKey,
            RowDateUpdateKey
        >,
    ): Promise<RowWithBaseFieldsModelSql<
        Row,
        RowPrimaryKey,
        RowDateAddKey,
        RowDateUpdateKey
    >>,

    update(
        row: Partial<Row>,
        options: FindOptionUpdateRowModelSql<
            Row,
            RowPrimaryKey,
            RowDateAddKey,
            RowDateUpdateKey,
            undefined
        >,
    ): Promise<void>;

    update(
        row: Partial<Row>,
        options: FindOptionUpdateRowModelSql<
            Row,
            RowPrimaryKey,
            RowDateAddKey,
            RowDateUpdateKey,
            true
        >,
    ): Promise<RowWithBaseFieldsModelSql<
        Row,
        RowPrimaryKey,
        RowDateAddKey,
        RowDateUpdateKey
    >>

    update(
        row: Partial<Row>,
        options: FindOptionUpdateRowModelSql<
            Row,
            RowPrimaryKey,
            RowDateAddKey,
            RowDateUpdateKey,
            false
        >,
    ): Promise<void>


    updateMany<HasReturning extends boolean = false>(
        row: Partial<Row>,
        options: FindOptionUpdateManyRowModelSql<
            Row,
            RowPrimaryKey,
            RowDateAddKey,
            RowDateUpdateKey,
            HasReturning
        >,
    ): HasReturning extends true ? Promise<RowWithBaseFieldsModelSql<
        Row,
        RowPrimaryKey,
        RowDateAddKey,
        RowDateUpdateKey
    >[]> : Promise<number>;

    destroy(props: PropsDeleteRowModelSql<
        Row,
        RowPrimaryKey,
        RowDateAddKey,
        RowDateUpdateKey
    >): Promise<number>,


    count(props?: PropsCountModelSql<
        Row,
        RowPrimaryKey,
        RowDateAddKey,
        RowDateUpdateKey
    >): Promise<number>


    findAll<
        ReturnAttributes extends Array<keyof RowWithBaseFieldsModelSql<
            Row,
            RowPrimaryKey,
            RowDateAddKey,
            RowDateUpdateKey
        >> | undefined = undefined,
        Incl extends Array<SqlAssociationRow<Includes>> = [],
        Aggregates extends Record<string, SqlAggregate<Row>> = {}
    >(
        props?: PropsFindAllModelSql<
            Row,
            RowPrimaryKey,
            RowDateAddKey,
            RowDateUpdateKey,
            ReturnAttributes,
            Includes,
            Incl,
            Aggregates
        >,
    ): Promise<ResultFindAllModelSql<
        Row,
        RowPrimaryKey,
        RowDateAddKey,
        RowDateUpdateKey,
        ReturnAttributes,
        Includes,
        Incl,
        Aggregates
    >>,

    findOne<
        ReturnAttributes extends Array<keyof RowWithBaseFieldsModelSql<
            Row,
            RowPrimaryKey,
            RowDateAddKey,
            RowDateUpdateKey
        >> | undefined = undefined,
        Aggregates extends Record<string, SqlAggregate<Row>> = {}
    >(
        options: PropsFindOneModelSql<
            Row,
            RowPrimaryKey,
            RowDateAddKey,
            RowDateUpdateKey,
            ReturnAttributes,
            Aggregates
        >,
    ): Promise<ResultFindOneModelSql<
        Row,
        RowPrimaryKey,
        RowDateAddKey,
        RowDateUpdateKey,
        ReturnAttributes,
        Aggregates
    >>

    findByPk<
        ReturnAttributes extends Array<keyof RowWithBaseFieldsModelSql<
            Row,
            RowPrimaryKey,
            RowDateAddKey,
            RowDateUpdateKey
        >> | undefined = undefined
    >(
        id: number,
        options?: PropsFindByPkModelSql<
            Row,
            RowPrimaryKey,
            RowDateAddKey,
            RowDateUpdateKey,
            ReturnAttributes
        >):
        Promise<ResultFindByPkModelSql<
            Row,
            RowPrimaryKey,
            RowDateAddKey,
            RowDateUpdateKey,
            ReturnAttributes
        >>,


    pagination<
        ReturnAttributes extends Array<keyof RowWithBaseFieldsModelSql<
            Row,
            RowPrimaryKey,
            RowDateAddKey,
            RowDateUpdateKey
        >> | undefined = undefined,
        Incl extends Array<SqlAssociationRow<Includes>> = [],
        Aggregates extends Record<string, SqlAggregate<Row>> = {}
    >(
        params?: PaginationQueryParams<RowWithBaseFieldsModelSql<
            Row,
            RowPrimaryKey,
            RowDateAddKey,
            RowDateUpdateKey
        >>,
        options?: OptionsPaginationModelSql<
            Row,
            RowPrimaryKey,
            RowDateAddKey,
            RowDateUpdateKey,
            ReturnAttributes,
            Includes,
            Incl,
            Aggregates
        >,
    ): Promise<PaginationValues<
        RowWithAggregatesModelSql<
            RowWithIncludeModelSql<
                RowWithBaseFieldsAndAttributesModelSql<
                    Row,
                    RowPrimaryKey,
                    RowDateAddKey,
                    RowDateUpdateKey,
                    ReturnAttributes
                >, Pick<Includes, Incl[number]['modelKey']>
            >,
            Aggregates
        >
    >>,

    getConfig(): ConfigModelSql

    hasOne(model: IModelSql<object>, options: {
        foreignKey: string
        as: string
        onDelete?:'RESTRICT' | 'SET_NULL' | 'CASCADE'
    }): this

    hasMany(model: IModelSql<object>, options: {
        foreignKey: string
        as: string
        onDelete?:'RESTRICT' | 'SET_NULL' | 'CASCADE'
    }): this

    belongsTo(model: IModelSql<object>, options: {
        foreignKey: string
        as: string
    }): this

    getColumns(): ModelSqlColumns<
        Row,
        RowPrimaryKey,
        RowDateAddKey,
        RowDateUpdateKey
    >

    query<Row extends object>(
        value: string,
        options?: {
            replacements?: Record<string, string | number | string[] | number[] | undefined>
        },
    ): Promise<Row[]>

    syncModel(): Promise<void>

    _row: Row

    getIncludes(): Includes

    _getRawModel(): any

    saveExtraData(key: string, value: string): this

    getExtraData(key: string): string | null

}

