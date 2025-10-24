import { OrderParams, WhereParams } from "../../../params";
import { WhereNoSql } from "../../core";
import { Entity } from "../../../entity";
export type NoSqlRepositoryFindOptions<ClassEntity extends object> = {
    where?: WhereNoSql<ClassEntity>;
    clientWhere?: WhereParams<Entity<ClassEntity>>;
};
export type NoSqlRepositoryFindAllOptions<ClassEntity extends object, ReturnAttributes extends Array<keyof ClassEntity> | undefined = undefined> = {
    where?: WhereNoSql<ClassEntity>;
    clientWhere?: WhereParams<Entity<ClassEntity>>;
    order?: OrderParams<Entity<ClassEntity>>;
    offset?: number;
    limit?: number;
    attributes?: ReturnAttributes;
};
export type NoSqlRepositoryPaginationOptions<ClassEntity extends object, ReturnAttributes extends Array<keyof ClassEntity> | undefined = undefined> = {
    where?: WhereNoSql<ClassEntity>;
    order?: OrderParams<Entity<ClassEntity>>;
    attributes?: ReturnAttributes;
};
