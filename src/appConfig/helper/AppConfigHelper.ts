export class AppConfigHelper {
    static checkHasNoSql(): boolean {
        const protocol = process.env.INIT_MONGODB_PROTOCOL
        const host = process.env.INIT_MONGODB_HOST
        const port = Number(process.env.INIT_MONGODB_PORT)
        const user = process.env.INIT_MONGODB_USER

        return !!protocol && !!host && !!port && !!user
    }

    static checkHasDynamicRedis(): boolean {
        const redisDynamicHost = process.env.INIT_REDIS_DYNAMIC_HOST
        const redisDynamicPort = process.env.INIT_REDIS_DYNAMIC_PORT
        const redisDynamicPassword = process.env.INIT_REDIS_DYNAMIC_PASSWORD

        return !!redisDynamicHost && !!redisDynamicPort && !!redisDynamicPassword
    }

    static checkHasStaticRedis(): boolean {
        const redisStaticHost = process.env.INIT_REDIS_STATIC_HOST
        const redisStaticPort = process.env.INIT_REDIS_STATIC_PORT
        const redisStaticPassword = process.env.INIT_REDIS_STATIC_PASSWORD

        return !!redisStaticHost && !!redisStaticPort && !!redisStaticPassword
    }

    static checkHasRedis(): boolean {
        const hasStaticRedis = this.checkHasStaticRedis()
        const hasDynamicRedis = this.checkHasDynamicRedis()
        return hasDynamicRedis || hasStaticRedis
    }


    static getRedisType(): 'dynamic' | 'static' | 'mix' | null {
        const hasStaticRedis = this.checkHasStaticRedis()
        const hasDynamicRedis = this.checkHasDynamicRedis()

        if (hasStaticRedis && hasDynamicRedis) {
            return 'mix'
        }
        if (hasDynamicRedis) {
            return 'dynamic'
        }
        if (hasStaticRedis) {
            return 'static'
        }
        return null
    }


    static checkHasStaticSql(): boolean {
        const staticDbUsername = process.env.INIT_SQL_STATIC_DB_USERNAME

        return !!staticDbUsername && staticDbUsername?.length >= 1
    }

    static checkHasDynamicSql(): boolean {
        const dynamicDbUsername = process.env.INIT_SQL_DYNAMIC_DB_USERNAME

        return !!dynamicDbUsername && dynamicDbUsername?.length >= 1
    }

    static checkHasSql(): boolean {
        const dynamicSql = this.checkHasDynamicSql()
        const staticSql = this.checkHasStaticSql()
        return dynamicSql || staticSql
    }

    static getSqlType(): 'dynamic' | 'static' | 'mix' | null {
        const dynamicSql = this.checkHasDynamicSql()
        const staticSql = this.checkHasStaticSql()

        if (dynamicSql && staticSql) {
            return 'mix'
        }
        if (dynamicSql) {
            return 'dynamic'
        }
        if (staticSql) {
            return 'static'
        }
        return null
    }

}