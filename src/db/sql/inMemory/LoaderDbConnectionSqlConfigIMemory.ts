import {
    ILoaderDbConnectionSqlConfigByDomain,
    ILoaderDbConnectionSqlConfigByLeId,
    ILoaderDbConnectionSqlConfigStatic,
} from '@db/core'

export class LoaderDbConnectionSqlConfigStaticInMemory implements ILoaderDbConnectionSqlConfigStatic {
    public getConfig(): {
        storage: string
        dialect: 'sqlite'
        logging: boolean
        cashedKey: string
        hasKeepConnectionAlive: boolean
    } {
        return {
            logging: false,
            dialect: 'sqlite',
            storage: ':memory:',
            cashedKey: 'static-in-memory',
            hasKeepConnectionAlive: false,
            
        }
    }
}

export class LoaderDbConnectionSqlConfigByLeIdInMemory implements ILoaderDbConnectionSqlConfigByLeId {
    public async getConfig(legalEntityId: number): Promise<{
        storage: string
        dialect: 'sqlite'
        logging: boolean
        cashedKey: string
        hasKeepConnectionAlive: boolean
    }> {
        return {
            logging: false,
            dialect: 'sqlite',
            storage: ':memory:',
            cashedKey: `dynamic-in-memory-by-le-id:${legalEntityId}`,
            hasKeepConnectionAlive: false,
        }
    }
}

export class LoaderDbConnectionSqlConfigByByDomainInMemory implements ILoaderDbConnectionSqlConfigByDomain {
    public async getConfig(domain: string): Promise<{
        storage: string
        dialect: 'sqlite'
        logging: boolean
        cashedKey: string
        hasKeepConnectionAlive: boolean
    }> {
        
        return {
            logging: false,
            dialect: 'sqlite',
            storage: ':memory:',
            cashedKey: `dynamic-in-memory-by-domain:${domain}`,
            hasKeepConnectionAlive: false,
        }
    }
}