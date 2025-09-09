import {OrderParams, WhereParams} from '@params'
import {NoSqlFilters} from '@model/core'


export type RowWithBaseFieldsModelNoSql<
    Row extends object,
    RowDateAddKey extends (string | null)  = 'date_add',
    RowDateUpdateKey extends (string | null) = 'date_update'
> = Row & RowBaseFieldsModelNoSql<
    RowDateAddKey,
    RowDateUpdateKey
>

export type RowWithBaseFieldsAndAttributesModelNoSql<
    Row extends object,
    RowDateAddKey extends (string | null)  = 'date_add',
    RowDateUpdateKey extends (string | null) = 'date_update',
    ReturnAttributes extends Array<keyof RowWithBaseFieldsModelNoSql<
        Row,
        RowDateAddKey,
        RowDateUpdateKey
    >> | undefined = undefined
> =
    ReturnAttributes extends Array<keyof RowWithBaseFieldsModelNoSql<
            Row,
            RowDateAddKey,
            RowDateUpdateKey
        >> ?
        Pick<RowWithBaseFieldsModelNoSql<
            Row,
            RowDateAddKey,
            RowDateUpdateKey
        >, ReturnAttributes[number]> :
        RowWithBaseFieldsModelNoSql<
            Row,
            RowDateAddKey,
            RowDateUpdateKey
        >

export type RowBaseFieldsModelNoSql<
    RowDateAddKey extends (string | null)  = 'date_add',
    RowDateUpdateKey extends (string | null) = 'date_update'
> =
    {_id: string;} &
    (RowDateAddKey extends string ? Record<RowDateAddKey, Date> : {}) &
    (RowDateUpdateKey extends string ? Record<RowDateUpdateKey, Date> : {})


export type KeysRowBaseFieldsModelNoSql<
    RowDateAddKey extends (string | null)  = 'date_add',
    RowDateUpdateKey extends (string | null) = 'date_update'
> = keyof RowBaseFieldsModelNoSql<RowDateAddKey,
    RowDateUpdateKey>

export type CreateAttrRowModelNoSql<
    Row extends object,
    RowDateAddKey extends (string | null)  = 'date_add',
    RowDateUpdateKey extends (string | null)= 'date_update'
> =
    Omit<
        Row,
        KeysRowBaseFieldsModelNoSql<
            RowDateAddKey,
            RowDateUpdateKey
        >>


export type PropsDeleteRowModelNoSql<
    Row extends object,
    RowDateAddKey extends (string | null)  = 'date_add',
    RowDateUpdateKey extends (string | null) = 'date_update'
> = {
    where?: WhereParams<RowWithBaseFieldsModelNoSql<
        Row,
        RowDateAddKey,
        RowDateUpdateKey
    >>,
    filters?: NoSqlFilters<RowWithBaseFieldsModelNoSql<Row, RowDateAddKey, RowDateUpdateKey>>,
}


export type PropsDeleteManyRowsModelNoSql<
    Row extends object,
    RowDateAddKey extends (string | null)  = 'date_add',
    RowDateUpdateKey extends (string | null) = 'date_update'
> = {
    where?: WhereParams<RowWithBaseFieldsModelNoSql<
        Row,
        RowDateAddKey,
        RowDateUpdateKey
    >>,
    filters?: NoSqlFilters<RowWithBaseFieldsModelNoSql<Row, RowDateAddKey, RowDateUpdateKey>>,
}

export type PropsCountModelNoSql<
    Row extends object,
    RowDateAddKey extends (string | null)  = 'date_add',
    RowDateUpdateKey extends (string | null) = 'date_update'
> = {
    where?: WhereParams<RowWithBaseFieldsModelNoSql<
        Row,
        RowDateAddKey,
        RowDateUpdateKey
    >>,
    filters?: NoSqlFilters<RowWithBaseFieldsModelNoSql<Row, RowDateAddKey, RowDateUpdateKey>>,
}

export type ConfigModelNoSql = {
    database: string,
    host: string,
    port: string,
    dbType: 'mongodb',
    tableName: string
}

export type FindOptionUpdateRowModelNoSql<
    Row extends object,
    RowDateAddKey extends (string | null)  = 'date_add',
    RowDateUpdateKey extends (string | null) = 'date_update',
    HasReturning extends (boolean | undefined) = boolean
> = {
    hasCheckExistence?: boolean,
    returning?: HasReturning,
    where?: WhereParams<RowWithBaseFieldsModelNoSql<
        Row,
        RowDateAddKey,
        RowDateUpdateKey
    >>,
    filters?: NoSqlFilters<RowWithBaseFieldsModelNoSql<Row, RowDateAddKey, RowDateUpdateKey>>,
}

export type PropsFindOneModelNoSql<
    Row extends object,
    RowDateAddKey extends (string | null)  = 'date_add',
    RowDateUpdateKey extends (string | null) = 'date_update',
    ReturnAttributes extends Array<keyof RowWithBaseFieldsModelNoSql<
        Row,
        RowDateAddKey,
        RowDateUpdateKey
    >> | undefined = undefined
> = {
    where?: WhereParams<RowWithBaseFieldsModelNoSql<
        Row,
        RowDateAddKey,
        RowDateUpdateKey
    >>;
    filters?: NoSqlFilters<RowWithBaseFieldsModelNoSql<Row, RowDateAddKey, RowDateUpdateKey>>,
    attributes?: ReturnAttributes;
};
export type ResultFindOneModelNoSql<
    Row extends object,
    RowDateAddKey extends (string | null)  = 'date_add',
    RowDateUpdateKey extends (string | null) = 'date_update',
    ReturnAttributes extends Array<keyof RowWithBaseFieldsModelNoSql<
        Row,
        RowDateAddKey,
        RowDateUpdateKey
    >> | undefined = undefined,
> = (ReturnAttributes extends Array<keyof RowWithBaseFieldsModelNoSql<
        Row,
        RowDateAddKey,
        RowDateUpdateKey
    >> ?
    (Pick<RowWithBaseFieldsModelNoSql<
        Row,
        RowDateAddKey,
        RowDateUpdateKey
    >, ReturnAttributes[number]>) :
    RowWithBaseFieldsModelNoSql<
        Row,
        RowDateAddKey,
        RowDateUpdateKey
    >) | null


export type PropsFindByPkModelNoSql<
    Row extends object,
    RowDateAddKey extends (string | null)  = 'date_add',
    RowDateUpdateKey extends (string | null) = 'date_update',
    ReturnAttributes extends Array<keyof RowWithBaseFieldsModelNoSql<
        Row,
        RowDateAddKey,
        RowDateUpdateKey
    >> | undefined = undefined
> = {
    attributes?: ReturnAttributes;
};
export type ResultFindByPkModelNoSql<
    Row extends object,
    RowDateAddKey extends (string | null)  = 'date_add',
    RowDateUpdateKey extends (string | null) = 'date_update',
    ReturnAttributes extends Array<keyof RowWithBaseFieldsModelNoSql<
        Row,
        RowDateAddKey,
        RowDateUpdateKey
    >> | undefined = undefined,
> =
    (ReturnAttributes extends Array<keyof RowWithBaseFieldsModelNoSql<
            Row,
            RowDateAddKey,
            RowDateUpdateKey
        >> ?
        (Pick<RowWithBaseFieldsModelNoSql<
            Row,
            RowDateAddKey,
            RowDateUpdateKey
        >, ReturnAttributes[number]>) :
        RowWithBaseFieldsModelNoSql<
            Row,
            RowDateAddKey,
            RowDateUpdateKey
        >)
    | null


export type PropsFindAllModelNoSql<
    Row extends object,
    RowDateAddKey extends (string | null)  = 'date_add',
    RowDateUpdateKey extends (string | null) = 'date_update',
    ReturnAttributes extends Array<keyof RowWithBaseFieldsModelNoSql<
        Row,
        RowDateAddKey,
        RowDateUpdateKey
    >> | undefined = undefined,
> = {
    where?: WhereParams<RowWithBaseFieldsModelNoSql<
        Row,
        RowDateAddKey,
        RowDateUpdateKey
    >>,
    order?: OrderParams<RowWithBaseFieldsModelNoSql<
        Row,
        RowDateAddKey,
        RowDateUpdateKey
    >>,
    filters?: NoSqlFilters<RowWithBaseFieldsModelNoSql<Row, RowDateAddKey, RowDateUpdateKey>>,
    offset?: number,
    limit?: number,
    attributes?: ReturnAttributes;
}
export type ResultFindAllModelNoSql<
    Row extends object,
    RowDateAddKey extends (string | null)  = 'date_add',
    RowDateUpdateKey extends (string | null) = 'date_update',
    ReturnAttributes extends Array<keyof RowWithBaseFieldsModelNoSql<
        Row,
        RowDateAddKey,
        RowDateUpdateKey
    >> | undefined = undefined,
> = ReturnAttributes extends Array<keyof RowWithBaseFieldsModelNoSql<
        Row,
        RowDateAddKey,
        RowDateUpdateKey
    >> ?
    (Pick<RowWithBaseFieldsModelNoSql<
        Row,
        RowDateAddKey,
        RowDateUpdateKey
    >, ReturnAttributes[number]>)[]
    : RowWithBaseFieldsModelNoSql<
        Row,
        RowDateAddKey,
        RowDateUpdateKey
    >[]


