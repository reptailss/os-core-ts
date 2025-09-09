import {DbSqlOptions, IDbConnectionSql} from '@db'
import {AppError} from '@appError'
import {DomainService} from '@domain'
import {DbConnectionSql, DbConnectionSqlHelper} from '@db/core'
import {appLogger} from '@logger'


const connections: Record<string, IDbConnectionSql> = {}

export class DbConnectionSqlFactory {

	static async getDynamicByDomain(props: {
		domain: string,
		optionsDb?: Partial<Omit<DbSqlOptions, 'dbDatabase'>>
	}): Promise<IDbConnectionSql> {

		const databaseName = await DomainService.getDatabaseNameByDomain(props.domain)

		return this.getDynamicByDatabaseName({
			databaseName,
			optionsDb: props.optionsDb,
		})
	}

	static getDynamicByDatabaseName(props: {
		databaseName: string
		optionsDb?: Partial<Omit<DbSqlOptions, 'dbDatabase'>>
	}): IDbConnectionSql {
		try {
			if (props.databaseName in connections) {
				return connections[props.databaseName]
			}

			const targetOptionsDb = DbConnectionSqlHelper.getTargetDynamicDbSqlOptions({
				options: props.optionsDb,
				databaseName: props.databaseName,
			})

			const connection = new DbConnectionSql({
				...targetOptionsDb,
				dbDatabase: props.databaseName,
			})

			DbConnectionSqlHelper.keepConnectionAlive(connection)

			connections[props.databaseName] = connection

			return connection
		} catch (error) {
			appLogger.error('os-core:Error connecting to dynamic sequelize database', error)
			throw new AppError('os-core:Error connecting to dynamic sequelize database', {
				errorKey: 'CONNECT_TO_DB_ERROR',
			})
		}
	}

	static getStatic(options?: Partial<DbSqlOptions>): IDbConnectionSql {
		try {
			const db = new DbConnectionSql(DbConnectionSqlHelper.getTargetStaticDbSqlOptions(options))
			DbConnectionSqlHelper.keepConnectionAlive(db)
			return db
		} catch (error) {
			appLogger.error('os-core:Error connecting to dynamic database', error)
			throw new AppError('os-core:Error connecting to dynamic database', {
				errorKey: 'CONNECT_TO_DB_ERROR',
			})
		}
	}


}
