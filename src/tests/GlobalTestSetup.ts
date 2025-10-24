import {DiContainer} from '@di'
import {LoaderSqlRepository, LoaderSqlRepositoryInMemory} from '@repository'
import {
    LoaderDbConnectionSqlConfigByDomain,
    LoaderDbConnectionSqlConfigByLeId,
    LoaderDbConnectionSqlConfigStatic,
} from '@db/core'
import {
    LoaderDbConnectionSqlConfigByByDomainInMemory,
    LoaderDbConnectionSqlConfigByLeIdInMemory,
    LoaderDbConnectionSqlConfigStaticInMemory,
} from '@db'



export class GlobalTestSetup {
    
    public static registerLoaderDbConnectionsSqlConfigInMemory() {
        DiContainer.register(LoaderDbConnectionSqlConfigStatic, {
            useClass: LoaderDbConnectionSqlConfigStaticInMemory,
        })
        DiContainer.register(LoaderDbConnectionSqlConfigByLeId, {
            useClass: LoaderDbConnectionSqlConfigByLeIdInMemory,
        })
        DiContainer.register(LoaderDbConnectionSqlConfigByDomain, {
            useClass: LoaderDbConnectionSqlConfigByByDomainInMemory,
        })
    }
    
    public static registerLoaderSqlRepositoryInMemory() {
        DiContainer.register(LoaderSqlRepository, {
            useClass: LoaderSqlRepositoryInMemory,
        })
    }
}
