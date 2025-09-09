import {DbNoSqlOptions} from '@db'
import {APP_CONFIG_OS_CORE} from '@appConfig'

export class DbConnectionNoSqlHelper {
    static getDbUrl(options: DbNoSqlOptions): string {
        let url = ``

        if (String(options.protocol || '').trim() !== '') {
            url += options.protocol

            if (String(options.user || '').trim() !== '') {
                url += options.user

                if (String(options.password || '').trim() !== '') {
                    url += ':' + options.password
                }
                url += '@'
            }

            if (String(options.host || '').trim() !== '') {
                url += options.host
            }

            if (options.protocol !== 'mongodb+srv://') {
                if (String(options.port || '').trim() !== '') {
                    url += ':' + options.port
                }
            }

            if (String(options.options || '').trim() !== '') {
                url += '?' + options.options
            }
        }


        return url
    }

    static getDbOptions = (optionsDb?: Partial<DbNoSqlOptions> | undefined): DbNoSqlOptions => {
        return {
            protocol: optionsDb?.protocol || APP_CONFIG_OS_CORE.noSql.protocol,
            host: optionsDb?.host || APP_CONFIG_OS_CORE.noSql.host,
            port: optionsDb?.port || APP_CONFIG_OS_CORE.noSql.port,
            user: optionsDb?.user || APP_CONFIG_OS_CORE.noSql.user,
            password: optionsDb?.password || APP_CONFIG_OS_CORE.noSql.password,
            options: optionsDb?.options || APP_CONFIG_OS_CORE.noSql.options,
        }
    }

}