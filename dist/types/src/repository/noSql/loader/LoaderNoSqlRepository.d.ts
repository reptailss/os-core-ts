import { IDbConnectionNoSql } from "../../../db";
import { INoSqlRepository, NoSqlRepository } from "../..";
import { NoSqlIndexes } from "../../core";
export declare class LoaderNoSqlRepository {
    byDatabaseNameAndCollectionName<ClassEntity extends object>(props: {
        databaseName: string;
        entity: ClassEntity;
        collectionName: string;
        indexes?: NoSqlIndexes<ClassEntity>;
    }): Promise<INoSqlRepository<ClassEntity>>;
    byDatabaseNameAndYearMonth<ClassEntity extends object>(props: {
        databaseName: string;
        entity: ClassEntity;
        collectionName: string;
        year: number;
        month: number;
        indexes?: NoSqlIndexes<ClassEntity>;
    }): Promise<INoSqlRepository<ClassEntity>>;
    staticByDbConnection<ClassEntity extends object>(props: {
        dbConnection: IDbConnectionNoSql;
        entity: ClassEntity;
        collectionName: string;
        indexes?: NoSqlIndexes<ClassEntity>;
    }): NoSqlRepository<ClassEntity>;
}
