import {DbConnectionSqlConfig} from '@db'
import {APP_CONFIG_OS_CORE} from '@appConfig'
import {Injectable} from '@decorators'
import {
    ILoaderDbConnectionSqlConfigByDomain,
    ILoaderDbConnectionSqlConfigByLeId,
    ILoaderDbConnectionSqlConfigStatic,
} from '@db/core'
import {DomainService} from '@domain'
import {OsCoreLegalEntityService} from '@services'

@Injectable()
export class LoaderDbConnectionSqlConfigStatic implements ILoaderDbConnectionSqlConfigStatic {
    public getConfig(): DbConnectionSqlConfig |
        {
            storage: string
            dialect: 'sqlite'
            logging: boolean
            cashedKey:string
            hasKeepConnectionAlive:boolean
        } {
        return {
            dialect: APP_CONFIG_OS_CORE.sql.staticDbDialect,
            host: APP_CONFIG_OS_CORE.sql.staticDbHost,
            port: APP_CONFIG_OS_CORE.sql.staticDbPort,
            charset: APP_CONFIG_OS_CORE.sql.staticDbCharset,
            dbDatabase: APP_CONFIG_OS_CORE.sql.staticDbDatabase,
            timezone: APP_CONFIG_OS_CORE.sql.staticDbTimezone,
            logging: false,
            dbUsername: APP_CONFIG_OS_CORE.sql.staticDbUsername,
            dbPassword: APP_CONFIG_OS_CORE.sql.staticDbPassword,
            hasKeepConnectionAlive:true
        }
    }
}

@Injectable()
export class LoaderDbConnectionSqlConfigByLeId implements ILoaderDbConnectionSqlConfigByLeId {
    public async getConfig(legalEntityId: number): Promise<DbConnectionSqlConfig |
        {
            storage: string
            dialect: 'sqlite'
            logging: boolean
            cashedKey:string
            hasKeepConnectionAlive:boolean
        }> {
        const {
            database,
            password,
            port,
            host,
            username,
        } = await OsCoreLegalEntityService.getDbConfigById(legalEntityId)
        
        return {
            dialect: APP_CONFIG_OS_CORE.sql.dynamicDbDialect,
            host,
            port,
            charset: APP_CONFIG_OS_CORE.sql.dynamicDbCharset,
            dbDatabase: database,
            timezone: APP_CONFIG_OS_CORE.sql.dynamicDbTimezone,
            logging: false,
            dbUsername: username,
            dbPassword: password,
            hasKeepConnectionAlive:true
        }
    }
}

@Injectable()
export class LoaderDbConnectionSqlConfigByDomain implements ILoaderDbConnectionSqlConfigByDomain {
    public async getConfig(domain: string): Promise<DbConnectionSqlConfig |
        {
            storage: string
            dialect: 'sqlite'
            logging: boolean
            cashedKey:string
            hasKeepConnectionAlive:boolean
        }> {
        const databaseName = await DomainService.getDatabaseNameByDomain(domain)
        
        return {
            dialect: APP_CONFIG_OS_CORE.sql.dynamicDbDialect,
            host: APP_CONFIG_OS_CORE.sql.dynamicDbHost,
            port: APP_CONFIG_OS_CORE.sql.dynamicDbPort,
            charset: APP_CONFIG_OS_CORE.sql.dynamicDbCharset,
            dbDatabase: databaseName,
            timezone: APP_CONFIG_OS_CORE.sql.dynamicDbTimezone,
            logging: false,
            dbUsername: APP_CONFIG_OS_CORE.sql.dynamicDbUsername,
            dbPassword: APP_CONFIG_OS_CORE.sql.dynamicDbPassword,
            hasKeepConnectionAlive:true
        }
    }
}