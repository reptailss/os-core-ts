import {IDbConnectionSql} from '@db'
import {
    DbConnectionSqKeepConnectionAlive,
    DbConnectionSql,
    DbConnectionSqlCashManager,
    LoaderDbConnectionSqlConfigByDomain,
    LoaderDbConnectionSqlConfigByLeId,
    LoaderDbConnectionSqlConfigStatic,
} from '@db/core'
import {DiContainer} from '@di'
import {APP_CONFIG_OS_CORE} from '@appConfig'
import {AppError} from '@appError'


export class DbConnectionSqlFactory {
    
    static async getDynamicByLeId(legalEntityId: number): Promise<IDbConnectionSql> {
        
        const configLoader = DiContainer.resolve(LoaderDbConnectionSqlConfigByLeId)
        
        const config = await configLoader.getConfig(legalEntityId)
        
        const key = 'dbDatabase' in config ? config.dbDatabase : config.cashedKey
        
        const dbConnectionFromCash = DbConnectionSqlCashManager.getFromCash(key)
        
        if (dbConnectionFromCash) {
            return dbConnectionFromCash
        }
        
        const connection = new DbConnectionSql(config)
        
        DbConnectionSqlCashManager.saveToCash(key, connection)
        
        if (config.hasKeepConnectionAlive) {
            DbConnectionSqKeepConnectionAlive.keepConnectionAlive(connection)
        }
        
        return connection
    }
    
    static async getDynamicByDomain(domain: string): Promise<IDbConnectionSql> {
        
        const configLoader = DiContainer.resolve(LoaderDbConnectionSqlConfigByDomain)
        
        const config = await configLoader.getConfig(domain)
        
        const key = 'dbDatabase' in config ? config.dbDatabase : config.cashedKey
        
        const dbConnectionFromCash = DbConnectionSqlCashManager.getFromCash(key)
        
        if (dbConnectionFromCash) {
            return dbConnectionFromCash
        }
        
        const connection = new DbConnectionSql(config)
        
        DbConnectionSqlCashManager.saveToCash(key, connection)
        
        if (config.hasKeepConnectionAlive) {
            DbConnectionSqKeepConnectionAlive.keepConnectionAlive(connection)
        }
        
        return connection
    }
    
    static getStatic(): IDbConnectionSql {
        
        const configLoader = DiContainer.resolve(LoaderDbConnectionSqlConfigStatic)
        
        const config = configLoader.getConfig()
        
        const key = 'dbDatabase' in config ? config.dbDatabase : config.cashedKey
        
        const dbConnectionFromCash = DbConnectionSqlCashManager.getFromCash(key)
        
        if (dbConnectionFromCash) {
            return dbConnectionFromCash
        }
        
        const connection = new DbConnectionSql(config)
        
        if (config.hasKeepConnectionAlive) {
            DbConnectionSqKeepConnectionAlive.keepConnectionAlive(connection)
        }
        
        DbConnectionSqlCashManager.saveToCash(key, connection)
        
        return connection
    }
    
    static getForCheckReadiness(): IDbConnectionSql {
        if (!APP_CONFIG_OS_CORE.sql.readinessDynamicSqlDatabaseName) {
            throw new AppError('Not found readiness dynamic sql database name in env')
        }
        
        return new DbConnectionSql({
            dialect: APP_CONFIG_OS_CORE.sql.dynamicDbDialect,
            host: APP_CONFIG_OS_CORE.sql.dynamicDbHost,
            port: APP_CONFIG_OS_CORE.sql.dynamicDbPort,
            charset: APP_CONFIG_OS_CORE.sql.dynamicDbCharset,
            dbDatabase: APP_CONFIG_OS_CORE.sql.readinessDynamicSqlDatabaseName,
            timezone: APP_CONFIG_OS_CORE.sql.dynamicDbTimezone,
            logging: false,
            dbUsername: APP_CONFIG_OS_CORE.sql.dynamicDbUsername,
            dbPassword: APP_CONFIG_OS_CORE.sql.dynamicDbPassword,
            hasKeepConnectionAlive: false,
        })
    }
    
    
}
