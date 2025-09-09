import Redis, {RedisOptions} from 'ioredis'


import {appLogger} from '@logger'
import {APP_CONFIG_OS_CORE} from '@appConfig'
import {AppError} from '@appError'


let redisClient: Redis | null = null

export class RedisStaticService {
	static async deleteValue(key: string): Promise<number> {
		const redisClient = await this.getRedisStaticClient()
		return redisClient.del(key)
	}

	static async getValue(key: string): Promise<string | null> {
		const redisClient = await this.getRedisStaticClient()
		return await redisClient.get(key)
	}

	static async setValue(key: string, value: string): Promise<void> {
		const redisClient = await this.getRedisStaticClient()
		await redisClient.set(key, value)
	}

	static async getMapValue(key: string): Promise<Record<string, string>> {
		const redisClient = await this.getRedisStaticClient()
		return await redisClient.hgetall(key)
	}

	static async getMapValueByFieldKey(key: string, fieldKey: string): Promise<string | null> {
		const redisClient = await this.getRedisStaticClient()
		return await redisClient.hget(key, fieldKey)
	}

	static async setMapValue(key: string, value: Record<string, string>): Promise<void> {
		const redisClient = await this.getRedisStaticClient()
		for (const fieldKey in value) {
			await redisClient.hset(key, fieldKey, value[fieldKey])
		}
	}

	static async deleteMapValue(key: string, fieldKey: string): Promise<number> {
		const redisClient = await this.getRedisStaticClient()
		return redisClient.hdel(key, fieldKey)
	}

	static async getClient(): Promise<Redis> {
		return this.getRedisStaticClient()
	}

	static async setMultipleValues(data: Record<string, string>): Promise<void> {
		const redisClient = await this.getRedisStaticClient()
		const pipeline = redisClient.pipeline()

		for (const key in data) {
			pipeline.set(key, data[key])
		}

		await pipeline.exec()
	}

	static async setMultipleMapValues(map: Record<string, Record<string, string>>): Promise<void> {
		const redisClient = await this.getRedisStaticClient()
		const pipeline = redisClient.pipeline()

		for (const key in map) {
			const fields = map[key]
			for (const fieldKey in fields) {
				pipeline.hset(key, fieldKey, fields[fieldKey])
			}
		}

		await pipeline.exec()
	}

	static async deleteMultipleValues(keys: string[]): Promise<void> {
		const redisClient = await this.getRedisStaticClient()
		const pipeline = redisClient.pipeline()

		for (const key of keys) {
			pipeline.del(key)
		}
		await pipeline.exec()
	}

	static async deleteMapFieldsPipeline(map: Record<string, string[]>): Promise<void> {
		const redisClient = await this.getRedisStaticClient()
		const pipeline = redisClient.pipeline()

		for (const key in map) {
			const fieldKeys = map[key]
			pipeline.hdel(key, ...fieldKeys)
		}

		await pipeline.exec()
	}

	static async checkConnection(): Promise<boolean> {
		try {
			const redisClient = await this.getRedisStaticClient()

			if (!redisClient) {
				return false
			}

			const res = await redisClient.ping()

			return res === 'PONG'

		} catch (error) {
			return false
		}
	}


	private static async getRedisStaticClient(): Promise<Redis> {

		if (!redisClient) {
			const newRedisClient = await this.getNewRedisClient()
			if (!newRedisClient) {
				throw new AppError('os-core:Error connecting to static Redis', {
					errorKey: 'CONNECT_TO_DB_ERROR',
				})
			}
			redisClient = newRedisClient

		}
		return redisClient
	}


	private static async getNewRedisClient(): Promise<Redis | null> {
		return new Promise((resolve, reject) => {
			const options: RedisOptions = {
				host: APP_CONFIG_OS_CORE.redis.redisStaticHost,
				port: APP_CONFIG_OS_CORE.redis.redisStaticPort,
				password: APP_CONFIG_OS_CORE.redis.redisStaticPassword,
				enableReadyCheck: false,

			}
			const redisClient = new Redis(options)

			redisClient.on('connect', () => {
				appLogger.info('os-core:Redis success:connected to redis like static api')
				resolve(redisClient)
			})
			redisClient.on('error', error => {
				appLogger.error('os-core:Redis error can`t connected to static redis', error)
				redisClient.disconnect()
				resolve(null)
			})
		})
	}
}


