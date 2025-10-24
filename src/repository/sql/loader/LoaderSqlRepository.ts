import {DbConnectionSqlFactory, IDbConnectionSql, ISqlMigrationTaskFactory, SqlMigrations} from '@db'
import {
    ILoaderSqlRepository,
    ISqlRepositoryDynamicRegistry,
    SqlAssociation,
    SqlIndexes,
    SqlRepositoryCashManager,
} from '@repository/core'
import {ISqlRepository, SqlRepository} from '@repository'
import {Injectable} from '@decorators'


@Injectable()
export class LoaderSqlRepository implements ILoaderSqlRepository {
    
    public async dynamicByDomain<
        ClassEntity extends object
    >(
        props: {
            domain: string
            entity: ClassEntity
            tableName: string
            migrationTaskFactory?: ISqlMigrationTaskFactory
            indexes?: SqlIndexes<ClassEntity>
            registry?: ISqlRepositoryDynamicRegistry<ClassEntity>
        }): Promise<ISqlRepository<ClassEntity>> {
        
        const key = `domain-${props.domain}_${props.tableName}`
        
        const repositoryFromCash = SqlRepositoryCashManager.getFromCash<ClassEntity>(key)
        
        if (repositoryFromCash) {
            return repositoryFromCash
        }
        
        const dbConnection = await DbConnectionSqlFactory.getDynamicByDomain(props.domain)
        
        const repository = new SqlRepository(
            dbConnection,
            props.tableName,
            props.entity,
            props.indexes,
        )
        
        repository.saveExtraData('domain', props.domain)
        
        await repository.syncRepository()
        
        if (props.migrationTaskFactory) {
            await new props.migrationTaskFactory(
                new SqlMigrations(dbConnection, props.tableName),
                dbConnection,
            ).runMigrations()
        }
        
        if (props.registry) {
            props.registry.register(repository)
        }
        
        SqlRepositoryCashManager.saveToCash(key, repository)
        
        return repository
    }
    
    public async dynamicDbConfigByLegalEntityId<
        ClassEntity extends object
    >
    (
        props: {
            legalEntityId: number
            entity: ClassEntity
            tableName: string
            migrationTaskFactory?: ISqlMigrationTaskFactory,
            indexes?: SqlIndexes<ClassEntity>
            registry?: ISqlRepositoryDynamicRegistry<ClassEntity>
        }): Promise<ISqlRepository<ClassEntity>> {
        
        const key = `le-${props.legalEntityId}_${props.tableName}`
        
        const repositoryFromCash = SqlRepositoryCashManager.getFromCash<ClassEntity>(key)
        
        if (repositoryFromCash) {
            return repositoryFromCash
        }
        
        const dbConnection = await DbConnectionSqlFactory.getDynamicByLeId(props.legalEntityId)
        
        const repository = new SqlRepository(
            dbConnection,
            props.tableName,
            props.entity,
            props.indexes,
        )
        
        repository.saveExtraData('leId', props.legalEntityId.toString())
        
        await repository.syncRepository()
        
        if (props.migrationTaskFactory) {
            await new props.migrationTaskFactory(
                new SqlMigrations(dbConnection, props.tableName),
                dbConnection,
            ).runMigrations()
        }
        
        if (props.registry) {
            props.registry.register(repository)
        }
        
        SqlRepositoryCashManager.saveToCash(key, repository)
        
        return repository
        
    }
    
    public staticByDbConnection<
        ClassEntity extends object,
        Includes extends Record<string, SqlAssociation<any>> = {},
    >(
        props: {
            entity: ClassEntity
            tableName: string,
            dbConnection: IDbConnectionSql
            indexes?: SqlIndexes<ClassEntity>
            includes?: Includes
        }): ISqlRepository<ClassEntity, Includes> {
        
        const key = `${props.dbConnection.cashedKey}-static-${props.tableName}`
        
        const repositoryFromCash = SqlRepositoryCashManager.getFromCash<ClassEntity, Includes>(key)
        
        if (repositoryFromCash) {
            return repositoryFromCash
        }
        
        const repository = new SqlRepository<ClassEntity, Includes>(
            props.dbConnection,
            props.tableName,
            props.entity,
            props.indexes,
            props.includes,
        )
        
        props.dbConnection.addModelForAssociation(props.tableName, repository)
        
        SqlRepositoryCashManager.saveToCash(key, repository)
        
        return repository
    }
    
}