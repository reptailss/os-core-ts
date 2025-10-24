import {appLogger} from '@logger'
import {INoSqlRepository} from '@repository'

const repositories: Record<string, INoSqlRepository<any>> = {}

function buildCollectionKey(props: {
    databaseName: string
    collectionName: string
}): string {
    return `${props.databaseName}_${props.collectionName}`
}


export class NoSqlRepositoriesCashManager {
    public static getRepositoryKeysFromCache(): string[] {
        return Object.keys(repositories)
    }
    
    
    public static deleteRepositoryFromCacheByDatabaseNameAndCollectionName(props: {
        databaseName: string
        collectionName: string
    }): void {
        const key = buildCollectionKey({
            databaseName: props.databaseName,
            collectionName: props.collectionName,
        })
        if (!(key in repositories)) {
            appLogger.error(`delete model:not found model ${key} in cache`)
            return
        }
        delete repositories[key]
    }
    
    public static saveToCash(
        key: string,
        repository: INoSqlRepository<any>,
    ): void {
        repositories[key] = repository
    }
    
    public static getFromCash(key: string): INoSqlRepository<any> | null {
        if (key in repositories) {
            return repositories[key]
        }
        return null
    }
}