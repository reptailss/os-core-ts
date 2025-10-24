import { IDbConnectionNoSql } from "../../../db";
import { INoSqlRepository } from "../..";
import { CreateEntity, Entity, UpdateEntity } from "../../../entity";
import { NoSqlIndexes, NoSqlRepositoryFindAllOptions, NoSqlRepositoryFindOptions, NoSqlRepositoryPaginationOptions, NoSqlRow } from "../../core";
import { PaginationQueryParams, PaginationValues } from "../../../pagination";
export declare class NoSqlRepository<ClassEntity extends object> implements INoSqlRepository<ClassEntity> {
    private readonly dbConnectionNoSqlFiltersBuilder;
    private readonly dbConnectionNoSqIndexes;
    private readonly dbConnection;
    private readonly model;
    private readonly collectionName;
    private readonly indexes?;
    private readonly databaseName;
    private readonly optionsDb?;
    constructor(dbConnection: IDbConnectionNoSql, collectionName: string, classEntity: ClassEntity, indexes?: NoSqlIndexes<ClassEntity>);
    syncIndexes(): Promise<void>;
    create(createEntity: CreateEntity<ClassEntity>): Promise<Entity<ClassEntity>>;
    createMany(createEntities: CreateEntity<ClassEntity>[]): Promise<number>;
    update<HasReturning extends boolean = false>(updateEntity: UpdateEntity<ClassEntity>, findOptions: NoSqlRepositoryFindOptions<ClassEntity>, hasReturning?: HasReturning): Promise<HasReturning extends true ? Entity<ClassEntity> : undefined>;
    updateMany(updateEntity: UpdateEntity<ClassEntity>, findOptions: NoSqlRepositoryFindOptions<ClassEntity>): Promise<number>;
    destroy(findOptions: NoSqlRepositoryFindOptions<ClassEntity>): Promise<number>;
    destroyMany(findOptions: NoSqlRepositoryFindOptions<ClassEntity>): Promise<number>;
    count(findOptions: NoSqlRepositoryFindOptions<ClassEntity>): Promise<number>;
    findOne(findOptions: NoSqlRepositoryFindOptions<ClassEntity>): Promise<Entity<ClassEntity> | null>;
    findByPk(value: string): Promise<Entity<ClassEntity> | null>;
    findAll<ReturnAttributes extends Array<keyof ClassEntity> | undefined = undefined>(findOptions: NoSqlRepositoryFindAllOptions<ClassEntity, ReturnAttributes>): Promise<NoSqlRow<ClassEntity, ReturnAttributes>[]>;
    pagination<ReturnAttributes extends Array<keyof ClassEntity> | undefined = undefined>(params: PaginationQueryParams<Entity<ClassEntity>>, paginationOptions?: NoSqlRepositoryPaginationOptions<ClassEntity, ReturnAttributes>): Promise<PaginationValues<NoSqlRow<ClassEntity, ReturnAttributes>>>;
    dropCollection(): Promise<void>;
    getConfig(): {
        database: string;
        host: string;
        port: string;
        dbType: 'mongodb';
        tableName: string;
    };
}
