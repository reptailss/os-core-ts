import { ILoaderSqlRepository, ISqlRepositoryDynamicRegistry, SqlAssociation, SqlIndexes } from "../../core";
import { IDbConnectionSql, ISqlMigrationTaskFactory } from "../../../db";
import { ISqlRepository } from "../..";
export declare class LoaderSqlRepositoryInMemory implements ILoaderSqlRepository {
    dynamicByDomain<ClassEntity extends object>(props: {
        domain: string;
        entity: ClassEntity;
        tableName: string;
        migrationTaskFactory?: ISqlMigrationTaskFactory;
        indexes?: SqlIndexes<ClassEntity>;
        registry?: ISqlRepositoryDynamicRegistry<ClassEntity>;
    }): Promise<ISqlRepository<ClassEntity>>;
    dynamicDbConfigByLegalEntityId<ClassEntity extends object>(props: {
        legalEntityId: number;
        entity: ClassEntity;
        tableName: string;
        migrationTaskFactory?: ISqlMigrationTaskFactory;
        indexes?: SqlIndexes<ClassEntity>;
        registry?: ISqlRepositoryDynamicRegistry<ClassEntity>;
    }): Promise<ISqlRepository<ClassEntity>>;
    staticByDbConnection<ClassEntity extends object, Includes extends Record<string, SqlAssociation<any>> = {}>(props: {
        entity: ClassEntity;
        tableName: string;
        dbConnection: IDbConnectionSql;
        indexes?: SqlIndexes<ClassEntity>;
        includes?: Includes;
    }): ISqlRepository<ClassEntity, Includes>;
}
