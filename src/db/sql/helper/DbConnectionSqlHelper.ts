import {DbSqlOptions, IDbConnectionSql} from '@db'
import {APP_CONFIG_OS_CORE} from '@appConfig'
import {appLogger} from '@logger'

export class DbConnectionSqlHelper {

    static getTargetDynamicDbSqlOptions({
                                            options,
                                            databaseName,
                                        }: {
        options?: Partial<DbSqlOptions>
        databaseName: string
    }): DbSqlOptions {
        return {

            host: options?.host || APP_CONFIG_OS_CORE.sql.dynamicDbHost,
            port: options?.port || APP_CONFIG_OS_CORE.sql.dynamicDbPort,
            dbUsername: options?.dbUsername || APP_CONFIG_OS_CORE.sql.dynamicDbUsername,
            dbPassword: options?.dbPassword || APP_CONFIG_OS_CORE.sql.dynamicDbPassword,
            dialect: options?.dialect || APP_CONFIG_OS_CORE.sql.dynamicDbDialect,
            charset: options?.charset || APP_CONFIG_OS_CORE.sql.dynamicDbCharset,
            timezone: options?.timezone || APP_CONFIG_OS_CORE.sql.dynamicDbTimezone,
            logging: options?.logging || false,

            dbDatabase: databaseName,

        }
    }

    static getTargetStaticDbSqlOptions(options?: Partial<DbSqlOptions>): DbSqlOptions {
        return {
            dialect: options?.dialect || APP_CONFIG_OS_CORE.sql.staticDbDialect,
            host: options?.host || APP_CONFIG_OS_CORE.sql.staticDbHost,
            port: options?.port || APP_CONFIG_OS_CORE.sql.staticDbPort,
            charset: options?.charset || APP_CONFIG_OS_CORE.sql.staticDbCharset,
            dbDatabase: options?.dbDatabase || APP_CONFIG_OS_CORE.sql.staticDbDatabase,
            timezone: options?.timezone || APP_CONFIG_OS_CORE.sql.staticDbTimezone,
            logging: options?.logging || false,
            dbUsername: options?.dbUsername || APP_CONFIG_OS_CORE.sql.staticDbUsername,
            dbPassword: options?.dbPassword || APP_CONFIG_OS_CORE.sql.staticDbPassword,
        }
    }


    static keepConnectionAlive = (connection: IDbConnectionSql) => {
        setInterval(async () => {
            try {
                await connection.query('SELECT 1')
            } catch (error) {
                appLogger.error('os-core: Error keep connection alive Sequelize', error)
            }
        }, 600000)
    }
}