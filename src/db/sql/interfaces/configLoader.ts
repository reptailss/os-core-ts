import {DbConnectionSqlConfig} from '@db'

export interface ILoaderDbConnectionSqlConfigStatic {
    getConfig(): DbConnectionSqlConfig |
        {
            storage: string
            dialect: 'sqlite'
            logging: boolean
            cashedKey: string
            hasKeepConnectionAlive: boolean
        }
}

export interface ILoaderDbConnectionSqlConfigByLeId {
    getConfig(legalEntityId: number): Promise<
        DbConnectionSqlConfig |
        {
            storage: string
            dialect: 'sqlite'
            logging: boolean
            cashedKey: string
            hasKeepConnectionAlive: boolean
        }
    >
}

export interface ILoaderDbConnectionSqlConfigByDomain {
    getConfig(domain: string): Promise<
        DbConnectionSqlConfig |
        {
            storage: string
            dialect: 'sqlite'
            logging: boolean
            cashedKey: string
            hasKeepConnectionAlive: boolean
        }
    >
}

