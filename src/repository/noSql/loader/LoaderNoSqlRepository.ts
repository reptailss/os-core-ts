import {DbConnectionNoSqlFactory, IDbConnectionNoSql} from '@db'
import {AppError} from '@appError'
import {INoSqlRepository, NoSqlRepository} from '@repository'
import {Injectable} from '@decorators'
import {DateHelper} from '@helpers'
import {NoSqlIndexes, NoSqlRepositoriesCashManager} from '@repository/core'

function getCollectionNameByYearMonth({
                                          month,
                                          collectionName,
                                          year,
                                      }: {
    year: number,
    month: number,
    collectionName: string,
}) {
    
    const currentMoth = month >= 10 ? month.toString() : `0${month}`
    
    return `${collectionName}_${year}_${currentMoth}`
    
}

function formatNumber(num: number): string {
    if (num === 0) {
        return '01'
    }
    return num < 10 ? `0${num}` : `${num}`
}

function buildKeyByYearMonth({
                                 databaseName,
                                 collectionName,
                                 year,
                                 month,
                             }: {
    databaseName: string
    collectionName: string
    year: number
    month: number
}): string {
    return `${databaseName}_${collectionName}_${year}_${formatNumber(month)}`
}


function buildCollectionKey(props: {
    databaseName: string
    collectionName: string
}): string {
    return `${props.databaseName}_${props.collectionName}`
}


@Injectable()
export class LoaderNoSqlRepository {
    
    public async byDatabaseNameAndCollectionName<
        ClassEntity extends object
    >(props: {
        databaseName: string
        entity: ClassEntity
        collectionName: string
        indexes?: NoSqlIndexes<ClassEntity>,
    }): Promise<INoSqlRepository<ClassEntity>> {
        
        const key = buildCollectionKey({
            databaseName: props.databaseName,
            collectionName: props.collectionName,
        })
        
        const oldRepository = NoSqlRepositoriesCashManager.getFromCash(key)
        
        if (oldRepository) {
            return oldRepository
        }
        
        const dbConnection = DbConnectionNoSqlFactory.getStaticByDatabaseName(props.databaseName)
        
        await dbConnection.connect()
        
        const repository = new NoSqlRepository(
            dbConnection,
            props.collectionName,
            props.entity,
            props.indexes,
        )
        
        if (props.indexes && props.indexes?.length >= 1) {
            await repository.syncIndexes()
        }
        
        NoSqlRepositoriesCashManager.saveToCash(key, repository as INoSqlRepository<any>)
        
        return repository
    }
    
    public async byDatabaseNameAndYearMonth<
        ClassEntity extends object
    >(
        props: {
            databaseName: string
            entity: ClassEntity
            collectionName: string
            year: number
            month: number
            indexes?: NoSqlIndexes<ClassEntity>,
        }): Promise<INoSqlRepository<ClassEntity>> {
        
        const currentYear = DateHelper.getCurrentYear()
        const maxYear = currentYear + 1
        const minYear = currentYear - 5
        
        if (props.year > maxYear || props.year < minYear) {
            throw new AppError(`The year cannot be more than 1 year in the future or less than 5 years before the current year. You provided: [${props.year}].`, {
                errorKey: 'GET_MODEL_ERROR',
            })
        }
        
        const key = buildKeyByYearMonth({
            databaseName: props.databaseName,
            collectionName: props.collectionName,
            year: props.year,
            month: props.month,
        })
        
        const oldRepository = NoSqlRepositoriesCashManager.getFromCash(key)
        
        if (oldRepository) {
            return oldRepository
        }
        
        const dbConnection = DbConnectionNoSqlFactory.getStaticByDatabaseName(props.databaseName)
        
        await dbConnection.connect()
        
        const repository = new NoSqlRepository(
            dbConnection,
            getCollectionNameByYearMonth({
                year: props.year,
                collectionName: props.collectionName,
                month: props.month,
            }),
            props.entity,
            props.indexes,
        )
        
        if (props.indexes && props.indexes?.length >= 1) {
            await repository.syncIndexes()
        }
        
        NoSqlRepositoriesCashManager.saveToCash(key, repository as INoSqlRepository<any>)
        
        return repository
    }
    
    public staticByDbConnection<ClassEntity extends object>(props: {
        dbConnection: IDbConnectionNoSql
        entity: ClassEntity
        collectionName: string
        indexes?: NoSqlIndexes<ClassEntity>,
    }): NoSqlRepository<ClassEntity> {
        const key = `${props.dbConnection.cashedKey}-static-${props.collectionName}`
        
        const repositoryFromCash = NoSqlRepositoriesCashManager.getFromCash(key)
        
        if (repositoryFromCash) {
            return repositoryFromCash as NoSqlRepository<ClassEntity>
        }
        
        const repository = new NoSqlRepository(
            props.dbConnection,
            props.collectionName,
            props.entity,
            props.indexes,
        )
        
        NoSqlRepositoriesCashManager.saveToCash(key, repository as INoSqlRepository<any>)
        
        return repository as NoSqlRepository<ClassEntity>
    }
}


