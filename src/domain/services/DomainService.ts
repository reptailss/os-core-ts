import {APP_CONFIG_OS_CORE} from '@appConfig'
import {RedisDynamicService} from '@redis'
import {AppError} from '@appError'

export class DomainService {
	static async getDatabaseNameByDomain(domain: string): Promise<string> {
		const key = `${APP_CONFIG_OS_CORE.redis.redisClientDatabasesPrefix}${domain}`
		const databaseName = await RedisDynamicService.getValue(key)
		if (!databaseName) {
			throw new AppError('os-core:Database name not found by domain in redis', {
				errorKey: 'SERVER_SIDE_ERROR',
			})
		}
		return databaseName
	}

}


