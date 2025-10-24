import { IDbConnectionSql } from "../../../db";
import { SqlAggregate, SqlAssociation, SqlAssociationRow, SqlIndexes, SqlRepositoryFindAllOptions, SqlRepositoryFindOptions, SqlRepositoryPaginationOptions, SqlRow } from "../../core";
import { ISqlRepository, SqlRepository } from "../..";
import { PaginationQueryParams, PaginationValues } from "../../../pagination";
import { CreateEntity, Entity, UpdateEntity } from "../../../entity";
export declare class SqlRepositorySqlite<ClassEntity extends object, Includes extends Record<string, SqlAssociation<any>> = {}> extends SqlRepository<ClassEntity, Includes> implements ISqlRepository<ClassEntity> {
    private _columns;
    constructor(dbConnection: IDbConnectionSql, tableName: string, classEntity: ClassEntity, indexes?: SqlIndexes<Entity<ClassEntity>>, includes?: Includes);
    create(createEntity: CreateEntity<ClassEntity>): Promise<Entity<ClassEntity>>;
    update<HasReturning extends boolean = false>(updateEntity: UpdateEntity<ClassEntity>, findOptions: SqlRepositoryFindOptions<ClassEntity>, hasReturning?: HasReturning): Promise<HasReturning extends true ? Entity<ClassEntity> : undefined>;
    updateMany(updateEntity: UpdateEntity<ClassEntity>, findOptions: SqlRepositoryFindOptions<ClassEntity>): Promise<number>;
    findOne(findOptions: SqlRepositoryFindOptions<ClassEntity>): Promise<Entity<ClassEntity> | null>;
    findByPk(value: number): Promise<Entity<ClassEntity> | null>;
    findAll<ReturnAttributes extends Array<keyof ClassEntity> | undefined = undefined, Incl extends Array<SqlAssociationRow<Includes>> = [], Aggregates extends Record<string, SqlAggregate<Entity<ClassEntity>>> = {}>(findOptions: SqlRepositoryFindAllOptions<ClassEntity, ReturnAttributes, Includes, Incl, Aggregates>): Promise<SqlRow<ClassEntity, Includes, ReturnAttributes, Incl, Aggregates>[]>;
    pagination<ReturnAttributes extends Array<keyof ClassEntity> | undefined = undefined, Incl extends Array<SqlAssociationRow<Includes>> = [], Aggregates extends Record<string, SqlAggregate<Entity<ClassEntity>>> = {}>(params: PaginationQueryParams<Entity<ClassEntity>>, paginationOptions?: SqlRepositoryPaginationOptions<ClassEntity, ReturnAttributes, Includes, Incl, Aggregates>): Promise<PaginationValues<SqlRow<ClassEntity, Includes, ReturnAttributes, Incl, Aggregates>>>;
    private parseRow;
    private serializeRow;
}
