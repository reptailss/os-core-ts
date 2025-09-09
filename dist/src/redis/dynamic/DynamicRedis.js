"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RedisDynamicService = void 0;
const ioredis_1 = __importDefault(require("ioredis"));
const _appError_1 = require("../../appError");
const _logger_1 = require("../../logger");
const _appConfig_1 = require("../../appConfig");
let redisClient = null;
class RedisDynamicService {
    static async deleteValue(key) {
        const redisClient = await this.getRedisDynamicClient();
        return redisClient.del(key);
    }
    static async getValue(key) {
        const redisClient = await this.getRedisDynamicClient();
        return redisClient.get(key);
    }
    static async setValue(key, value) {
        const redisClient = await this.getRedisDynamicClient();
        await redisClient.set(key, value);
    }
    static async getMapValue(key) {
        const redisClient = await this.getRedisDynamicClient();
        return redisClient.hgetall(key);
    }
    static async setMapValue(key, value) {
        const redisClient = await this.getRedisDynamicClient();
        for (const fieldKey in value) {
            await redisClient.hset(key, fieldKey, value[fieldKey]);
        }
    }
    static async getMapValueByFieldKey(key, fieldKey) {
        const redisClient = await this.getRedisDynamicClient();
        return await redisClient.hget(key, fieldKey);
    }
    static async deleteMapValue(key, fieldKey) {
        const redisClient = await this.getRedisDynamicClient();
        return redisClient.hdel(key, fieldKey);
    }
    static async getClient() {
        return this.getRedisDynamicClient();
    }
    static async checkConnection() {
        try {
            const redisClient = await this.getRedisDynamicClient();
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
    static async getRedisDynamicClient() {
        if (!redisClient) {
            const newRedisClient = await this.getNewRedisClient();
            if (!newRedisClient) {
                throw new _appError_1.AppError('os-core:Error connecting to dynamic Redis', {
                    errorKey: 'CONNECT_TO_REDIS_ERROR',
                });
            }
            redisClient = newRedisClient;
        }
        return redisClient;
    }
}
exports.RedisDynamicService = RedisDynamicService;
RedisDynamicService.getNewRedisClient = () => {
    return new Promise((resolve, reject) => {
        const options = {
            host: _appConfig_1.APP_CONFIG_OS_CORE.redis.redisDynamicHost,
            port: _appConfig_1.APP_CONFIG_OS_CORE.redis.redisDynamicPort,
            password: _appConfig_1.APP_CONFIG_OS_CORE.redis.redisDynamicPassword,
            enableReadyCheck: false,
        };
        const redisClient = new ioredis_1.default(options);
        redisClient.on('connect', () => {
            _logger_1.appLogger.info('os-core:Redis success:connected to redis like dynamic api');
            resolve(redisClient);
        });
        redisClient.on('error', error => {
            _logger_1.appLogger.error('os-core:Redis error can`t connected to dynamic redis', error);
            redisClient.disconnect();
            resolve(null);
        });
    });
};
//# sourceMappingURL=DynamicRedis.js.map