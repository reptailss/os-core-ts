import { PaginationQueryParams, PaginationValues } from "../../../pagination";
import { NoSqlRow, WhereNoSql } from "../../core";
import { Entity } from "../../../entity";
import { OrderParams, WhereParams } from "../../../params";
interface PaginationNoSqlRepository<ClassEntity extends object> {
    findAll<ReturnAttributes extends Array<keyof ClassEntity> | undefined = undefined>(findOptions: {
        where?: WhereNoSql<ClassEntity>;
        clientWhere?: WhereParams<Entity<ClassEntity>>;
        order?: OrderParams<Entity<ClassEntity>>;
        offset?: number;
        limit?: number;
        attributes?: ReturnAttributes;
    }): Promise<NoSqlRow<ClassEntity, ReturnAttributes>[]>;
    count(findOptions: {
        where?: WhereNoSql<ClassEntity>;
        clientWhere?: WhereParams<Entity<ClassEntity>>;
    }): Promise<number>;
}
export declare class MultiCollectionPaginationNoSqlRepository {
    static byYearAndMoth<ClassEntity extends object, ReturnAttributes extends Array<keyof ClassEntity> | undefined = undefined>({ dateStart, dateEnd, loaderRepository, params, where, attributes, dateKey, }: {
        dateStart: Date;
        dateEnd: Date;
        loaderRepository: {
            entity: ClassEntity;
            load: (month: number, year: number) => Promise<PaginationNoSqlRepository<ClassEntity>>;
        };
        params: PaginationQueryParams<Entity<ClassEntity>>;
        where?: WhereNoSql<ClassEntity>;
        attributes?: ReturnAttributes;
        dateKey?: keyof ClassEntity;
    }): Promise<PaginationValues<NoSqlRow<ClassEntity, ReturnAttributes>>>;
    static byCollectionNames<ClassEntity extends object, ReturnAttributes extends Array<keyof ClassEntity> | undefined = undefined>({ loaderRepository, params, collectionNames, where, attributes, }: {
        loaderRepository: {
            load: (collectionName: string) => Promise<PaginationNoSqlRepository<ClassEntity>>;
        };
        params: PaginationQueryParams<Entity<ClassEntity>>;
        where?: WhereNoSql<ClassEntity>;
        attributes?: ReturnAttributes;
        collectionNames: string[];
    }): Promise<PaginationValues<NoSqlRow<ClassEntity, ReturnAttributes>>>;
}
export {};
