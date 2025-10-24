import { IDbConnectionSql } from "../../../db";
import { SqlAggregate, SqlAssociation, SqlAssociationRow, SqlIndexes, SqlRepositoryFindAllOptions, SqlRepositoryFindOptions, SqlRepositoryPaginationOptions, SqlRow } from "../../core";
import { ISqlRepository } from "../..";
import { PaginationQueryParams, PaginationValues } from "../../../pagination";
import { CreateEntity, Entity, UpdateEntity } from "../../../entity";
type ModelSequelize<T extends object = any, A extends object = any> = any;
export declare class SqlRepository<ClassEntity extends object, Includes extends Record<string, SqlAssociation<any>> = {}> implements ISqlRepository<ClassEntity> {
    private readonly tableName;
    private readonly dbConnection;
    private readonly model;
    private extraData;
    private _includes;
    private readonly dbConnectionSqlQueryBuilder;
    _entity: Entity<ClassEntity>;
    constructor(dbConnection: IDbConnectionSql, tableName: string, classEntity: ClassEntity, indexes?: SqlIndexes<Entity<ClassEntity>>, includes?: Includes);
    create(createEntity: CreateEntity<ClassEntity>): Promise<Entity<ClassEntity>>;
    createMany(createEntities: CreateEntity<ClassEntity>[]): Promise<number>;
    private createRow;
    update<HasReturning extends boolean = false>(updateEntity: UpdateEntity<ClassEntity>, findOptions: SqlRepositoryFindOptions<ClassEntity>, hasReturning?: HasReturning): Promise<HasReturning extends true ? Entity<ClassEntity> : undefined>;
    updateMany(updateEntity: UpdateEntity<ClassEntity>, findOptions: SqlRepositoryFindOptions<ClassEntity>): Promise<number>;
    destroy(findOptions: SqlRepositoryFindOptions<ClassEntity>): Promise<number>;
    destroyMany(findOptions: SqlRepositoryFindOptions<ClassEntity>): Promise<number>;
    count<Incl extends Array<SqlAssociationRow<Includes>> = []>(findOptions: SqlRepositoryFindOptions<ClassEntity, Includes, Incl>): Promise<number>;
    findOne(findOptions: SqlRepositoryFindOptions<ClassEntity>): Promise<Entity<ClassEntity> | null>;
    findByPk(value: number): Promise<Entity<ClassEntity> | null>;
    findAll<ReturnAttributes extends Array<keyof ClassEntity> | undefined = undefined, Incl extends Array<SqlAssociationRow<Includes>> = [], Aggregates extends Record<string, SqlAggregate<Entity<ClassEntity>>> = {}>(findOptions: SqlRepositoryFindAllOptions<ClassEntity, ReturnAttributes, Includes, Incl, Aggregates>): Promise<SqlRow<ClassEntity, Includes, ReturnAttributes, Incl, Aggregates>[]>;
    pagination<ReturnAttributes extends Array<keyof ClassEntity> | undefined = undefined, Incl extends Array<SqlAssociationRow<Includes>> = [], Aggregates extends Record<string, SqlAggregate<Entity<ClassEntity>>> = {}>(params: PaginationQueryParams<Entity<ClassEntity>>, paginationOptions?: SqlRepositoryPaginationOptions<ClassEntity, ReturnAttributes, Includes, Incl, Aggregates>): Promise<PaginationValues<SqlRow<ClassEntity, Includes, ReturnAttributes, Incl, Aggregates>>>;
    query<Row extends object>(value: string, options?: {
        replacements?: Record<string, string | number | string[] | number[] | undefined>;
    }): Promise<Row[]>;
    getConfig(): {
        database: string;
        host: string;
        port: string;
        dbType: 'mysql';
        tableName: string;
    };
    hasOne(model: ISqlRepository<object>, options: {
        foreignKey: string;
        onDelete?: 'RESTRICT' | 'SET_NULL' | 'CASCADE';
    }): this;
    hasMany(model: ISqlRepository<object>, options: {
        foreignKey: string;
        onDelete?: 'RESTRICT' | 'SET_NULL' | 'CASCADE';
    }): this;
    belongsTo(model: ISqlRepository<object>, options: {
        foreignKey: string;
    }): this;
    getExtraData(key: string): string | null;
    saveExtraData(key: string, value: string): this;
    syncRepository(): Promise<void>;
    _getRawModel(): ModelSequelize<any>;
    getIncludes(): Includes;
}
export {};
