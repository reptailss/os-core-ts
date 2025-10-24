"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RedisStaticService = void 0;
const ioredis_1 = __importDefault(require("ioredis"));
const _logger_1 = require("../../logger");
const _appConfig_1 = require("../../appConfig");
const _appError_1 = require("../../appError");
let redisClient = null;
class RedisStaticService {
    static async deleteValue(key) {
        const redisClient = await this.getRedisStaticClient();
        return redisClient.del(key);
    }
    static async getValue(key) {
        const redisClient = await this.getRedisStaticClient();
        return await redisClient.get(key);
    }
    static async setValue(key, value) {
        const redisClient = await this.getRedisStaticClient();
        await redisClient.set(key, value);
    }
    static async getMapValue(key) {
        const redisClient = await this.getRedisStaticClient();
        return await redisClient.hgetall(key);
    }
    static async getMapValueByFieldKey(key, fieldKey) {
        const redisClient = await this.getRedisStaticClient();
        return await redisClient.hget(key, fieldKey);
    }
    static async setMapValue(key, value) {
        const redisClient = await this.getRedisStaticClient();
        for (const fieldKey in value) {
            await redisClient.hset(key, fieldKey, value[fieldKey]);
        }
    }
    static async deleteMapValue(key, fieldKey) {
        const redisClient = await this.getRedisStaticClient();
        return redisClient.hdel(key, fieldKey);
    }
    static async getClient() {
        return this.getRedisStaticClient();
    }
    static async setMultipleValues(data) {
        const redisClient = await this.getRedisStaticClient();
        const pipeline = redisClient.pipeline();
        for (const key in data) {
            pipeline.set(key, data[key]);
        }
        await pipeline.exec();
    }
    static async setMultipleMapValues(map) {
        const redisClient = await this.getRedisStaticClient();
        const pipeline = redisClient.pipeline();
        for (const key in map) {
            const fields = map[key];
            for (const fieldKey in fields) {
                pipeline.hset(key, fieldKey, fields[fieldKey]);
            }
        }
        await pipeline.exec();
    }
    static async deleteMultipleValues(keys) {
        const redisClient = await this.getRedisStaticClient();
        const pipeline = redisClient.pipeline();
        for (const key of keys) {
            pipeline.del(key);
        }
        await pipeline.exec();
    }
    static async deleteMapFieldsPipeline(map) {
        const redisClient = await this.getRedisStaticClient();
        const pipeline = redisClient.pipeline();
        for (const key in map) {
            const fieldKeys = map[key];
            pipeline.hdel(key, ...fieldKeys);
        }
        await pipeline.exec();
    }
    static async checkConnection() {
        try {
            const redisClient = await this.getRedisStaticClient();
            if (!redisClient) {
                return false;
            }
            const res = await redisClient.ping();
            return res === 'PONG';
        }
        catch (error) {
            return false;
        }
    }
    static async close() {
        if (!redisClient) {
            return;
        }
        redisClient.disconnect();
        redisClient = null;
    }
    static async getRedisStaticClient() {
        if (!redisClient) {
            const newRedisClient = await this.getNewRedisClient();
            if (!newRedisClient) {
                throw new _appError_1.AppError('os-core:Error connecting to static Redis', {
                    errorKey: 'CONNECT_TO_DB_ERROR',
                });
            }
            redisClient = newRedisClient;
        }
        return redisClient;
    }
    static async getNewRedisClient() {
        return new Promise((resolve, reject) => {
            const options = {
                host: _appConfig_1.APP_CONFIG_OS_CORE.redis.redisStaticHost,
                port: _appConfig_1.APP_CONFIG_OS_CORE.redis.redisStaticPort,
                password: _appConfig_1.APP_CONFIG_OS_CORE.redis.redisStaticPassword,
                enableReadyCheck: false,
            };
            const redisClient = new ioredis_1.default(options);
            redisClient.on('connect', () => {
                _logger_1.appLogger.info('os-core:Redis success:connected to redis like static api');
                resolve(redisClient);
            });
            redisClient.on('error', error => {
                _logger_1.appLogger.error('os-core:Redis error can`t connected to static redis', error);
                redisClient.disconnect();
                resolve(null);
            });
        });
    }
}
exports.RedisStaticService = RedisStaticService;
//# sourceMappingURL=StaticRedis.js.map