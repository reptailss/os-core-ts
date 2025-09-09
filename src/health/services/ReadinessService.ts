import {APP_CONFIG_OS_CORE} from '@appConfig'
import {ReadinessInfo, ReadinessStatus} from '@health'
import {DbConnectionSqlFactory} from '@db'
import {RedisDynamicService, RedisStaticService} from '@redis'
import {FileService} from '@files'



export class ReadinessService {

    public async getReadiness(): Promise<{
        code: 200 | 500
        status: 'ok' | 'bad'
        info: ReadinessInfo
    }> {

        let readinessDto: ReadinessInfo = {}

        if (APP_CONFIG_OS_CORE.sql.hasSql) {
            readinessDto.mysql = await this.checkSqlDbReadiness()
        }
        if (APP_CONFIG_OS_CORE.redis.hasRedis) {
            const res = await this.checkRedisReadiness()
            readinessDto = {
                ...readinessDto,
                ...res,
            }
        }
        if (APP_CONFIG_OS_CORE.noSql.hasNoSql) {
            readinessDto.mongo_db = 'success'
        }

        if (APP_CONFIG_OS_CORE.awsS3.hasUploadToS3) {
            readinessDto.aws = await this.checkAwsS3()
        }
        const response: {
            code: 200 | 500
            status: 'ok' | 'bad'
            info: ReadinessInfo
        } = {
            status: 'ok',
            code: 200,
            info: readinessDto,
        }

        for (const key in readinessDto) {
            const status = readinessDto[key as keyof ReadinessInfo]
            if (status === 'error') {
                response.status = 'bad'
                response.code = 500
                break
            }
        }
        return response
    }


    private async checkSqlDbReadiness(): Promise<ReadinessStatus> {

        if (APP_CONFIG_OS_CORE.sql.sqlDbType === 'mix') {
            const dynamicDb = await this.checkDynamicDbSql()
            const staticDb = await this.checkStaticDbSql()
            return dynamicDb === 'success' && staticDb === 'success' ? 'success' : 'error'
        }

        if (APP_CONFIG_OS_CORE.sql.sqlDbType === 'static') {
            return await this.checkStaticDbSql()
        }

        if (APP_CONFIG_OS_CORE.sql.sqlDbType === 'dynamic') {
            return await this.checkDynamicDbSql()
        }

        return 'success'
    };

    private async checkDynamicDbSql(databaseName?: string): Promise<ReadinessStatus> {
        try {
            const connection = DbConnectionSqlFactory.getDynamicByDatabaseName({
                databaseName: databaseName || APP_CONFIG_OS_CORE.sql.readinessDynamicSqlDatabaseName,
            })
            if (!connection) {
                return 'error'
            }
            await connection.checkConnection()
            return 'success'
        } catch (e) {
            return 'error'
        }
    }

    private async checkStaticDbSql(): Promise<ReadinessStatus> {
        try {
            const dbConnection = DbConnectionSqlFactory.getStatic()
            await dbConnection.checkConnection()
            return 'success'
        } catch (e) {
            return 'error'
        }
    }


    private async checkRedisReadiness(): Promise<{
        redis_db?: ReadinessStatus,
        redis?: ReadinessStatus,
    }> {
        const res: {
            redis_db?: ReadinessStatus,
            redis?: ReadinessStatus,
        } = {}

        if (APP_CONFIG_OS_CORE.redis.redisType === 'static' || APP_CONFIG_OS_CORE.redis.redisType === 'mix') {
            res.redis_db = await this.checkRedisStaticReadiness()
        }
        if (APP_CONFIG_OS_CORE.redis.redisType === 'dynamic' || APP_CONFIG_OS_CORE.redis.redisType === 'mix') {
            res.redis_db = await this.checkRedisDynamicReadiness()
        }

        return res
    }

    private async checkRedisDynamicReadiness(): Promise<ReadinessStatus> {
        try {
            const hasConnection = await RedisDynamicService.checkConnection()
            if (!hasConnection) {
                return 'error'
            }
            return 'success'
        } catch (error) {
            return 'error'
        }
    };

    private async checkRedisStaticReadiness(): Promise<ReadinessStatus> {
        try {
            const hasConnection = await RedisStaticService.checkConnection()
            if (!hasConnection) {
                return 'error'
            }
            return 'success'
        } catch (error) {
            return 'error'
        }
    };

    private async checkAwsS3(): Promise<ReadinessStatus> {
        try {
            const hasConnection = await FileService.checkAwsS3()

            if (!hasConnection) {
                return 'error'
            }
            return 'success'
        } catch (error) {
            return 'error'
        }
    }


}