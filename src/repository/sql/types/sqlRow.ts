import {SqlAggregate, SqlAssociation, SqlAssociationRow} from '@repository/core'
import {Entity} from '@entity'



type RowWithAggregatesModelSql<
    Row extends object,
    Aggregates extends Record<string, SqlAggregate<Row>> = {}
> = Row & {
    [K in keyof Aggregates]: string | number
};


type RowWithIncludeModelSql<
    Entity extends object,
    Includes extends Record<string, SqlAssociation<any>> | undefined
> = Includes extends undefined
    ? Entity
    : Entity & {
    [K in keyof Includes]: Includes[K] extends SqlAssociation<infer IncludedRow>
        ? Includes[K]['type'] extends 'hasMany'
            ? Array<Includes[K]['_entity']>
            : Includes[K]['_entity']
        : never
};


export type SqlRow<
    ClassEntity extends object,
    Includes extends Record<string, SqlAssociation<any>> = {},
    ReturnAttributes extends Array<keyof ClassEntity> | undefined = undefined,
    Incl extends Array<SqlAssociationRow<Includes>> = [],
    Aggregates extends Record<string, SqlAggregate<Entity<ClassEntity>>> = {}
> = RowWithAggregatesModelSql<
    RowWithIncludeModelSql<
        ReturnAttributes extends Array<keyof Entity<ClassEntity>> ? Pick<Entity<ClassEntity>, ReturnAttributes[number]> : Entity<ClassEntity>,
        Pick<Includes, Incl[number]['modelKey']>>,
    Aggregates>