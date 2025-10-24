import {SqlAggregate, SqlAssociation, SqlAssociationRow, WhereSql} from '@repository/core'
import {OrderParams, WhereParams} from '@params'
import {Entity} from '@entity'

export type SqlRepositoryFindOptions<
    ClassEntity extends object,
    Includes extends Record<string, SqlAssociation<any>> = {},
    Incl extends Array<SqlAssociationRow<Includes>> = [],
> = {
    where?: WhereSql<ClassEntity>
    clientWhere?: WhereParams<Entity<ClassEntity>>
    include?: Incl
}

export type SqlRepositoryFindAllOptions<
    ClassEntity extends object,
    ReturnAttributes extends Array<keyof ClassEntity> | undefined = undefined,
    Includes extends Record<string, SqlAssociation<any>> = {},
    Incl extends Array<SqlAssociationRow<Includes>> = [],
    Aggregates extends Record<string, SqlAggregate<Entity<ClassEntity>>> = {}
> = {
    where?: WhereSql<ClassEntity>
    clientWhere?: WhereParams<Entity<ClassEntity>>
    order?: OrderParams<Entity<ClassEntity>>
    offset?: number
    limit?: number
    attributes?: ReturnAttributes
    include?: Incl
    aggregates?: Aggregates
    group?: Array<keyof ClassEntity>
}

export type SqlRepositoryPaginationOptions<
    ClassEntity extends object,
    ReturnAttributes extends Array<keyof ClassEntity> | undefined = undefined,
    Includes extends Record<string, SqlAssociation<any>> = {},
    Incl extends Array<SqlAssociationRow<Includes>> = [],
    Aggregates extends Record<string, SqlAggregate<Entity<ClassEntity>>> = {}
> = {
    where?: WhereSql<ClassEntity>
    clientWhere?: WhereParams<Entity<ClassEntity>>
    attributes?: ReturnAttributes
    include?: Incl
    aggregates?: Aggregates
    group?: Array<keyof ClassEntity>
}