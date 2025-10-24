import Redis, {RedisOptions} from 'ioredis'
import {AppError} from '@appError'
import {appLogger} from '@logger'
import {APP_CONFIG_OS_CORE} from '@appConfig'

let redisClient: Redis | null = null

export class RedisDynamicService {
    static async deleteValue(key: string): Promise<number> {
        const redisClient = await this.getRedisDynamicClient()
        return redisClient.del(key)
    }
    
    static async getValue(key: string): Promise<string | null> {
        const redisClient = await this.getRedisDynamicClient()
        return redisClient.get(key)
    }
    
    static async setValue(key: string, value: string): Promise<void> {
        const redisClient = await this.getRedisDynamicClient()
        await redisClient.set(key, value)
    }
    
    static async getMapValue(key: string): Promise<Record<string, string> | {}> {
        const redisClient = await this.getRedisDynamicClient()
        return redisClient.hgetall(key)
    }
    
    static async setMapValue(key: string, value: Record<string, string>): Promise<void> {
        const redisClient = await this.getRedisDynamicClient()
        for (const fieldKey in value) {
            await redisClient.hset(key, fieldKey, value[fieldKey])
        }
    }
    
    static async getMapValueByFieldKey(key: string, fieldKey: string): Promise<string | null> {
        const redisClient = await this.getRedisDynamicClient()
        return await redisClient.hget(key, fieldKey)
    }
    
    static async deleteMapValue(key: string, fieldKey: string): Promise<number> {
        const redisClient = await this.getRedisDynamicClient()
        return redisClient.hdel(key, fieldKey)
    }
    
    static async getClient(): Promise<Redis> {
        return this.getRedisDynamicClient()
    }
    
    static async checkConnection(): Promise<boolean> {
        try {
            const redisClient = await this.getRedisDynamicClient()
            
            if (!redisClient) {
                return false
            }
            
            const res = await redisClient.ping()
            
            return res === 'PONG'
            
        } catch (error) {
            return false
        }
    }
    
    static async close(): Promise<void> {
        if (!redisClient) {
            return
        }
        redisClient.disconnect()
        redisClient = null
    }
    
    private static async getRedisDynamicClient() {
        if (!redisClient) {
            const newRedisClient = await this.getNewRedisClient()
            if (!newRedisClient) {
                throw new AppError('os-core:Error connecting to dynamic Redis', {
                    errorKey: 'CONNECT_TO_REDIS_ERROR',
                })
            }
            redisClient = newRedisClient
            
        }
        return redisClient
    }
    
    private static getNewRedisClient = (): Promise<Redis | null> => {
        return new Promise((resolve, reject) => {
            const options: RedisOptions = {
                host: APP_CONFIG_OS_CORE.redis.redisDynamicHost,
                port: APP_CONFIG_OS_CORE.redis.redisDynamicPort,
                password: APP_CONFIG_OS_CORE.redis.redisDynamicPassword,
                enableReadyCheck: false,
                
            }
            const redisClient = new Redis(options)
            
            redisClient.on('connect', () => {
                appLogger.info('os-core:Redis success:connected to redis like dynamic api')
                resolve(redisClient)
            })
            redisClient.on('error', error => {
                appLogger.error('os-core:Redis error can`t connected to dynamic redis', error)
                redisClient.disconnect()
                resolve(null)
            })
        })
    }
}
