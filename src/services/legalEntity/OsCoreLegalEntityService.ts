import {RedisStaticService} from '@redis'
import {AppError} from '@appError'

export class OsCoreLegalEntityService {
    
    static async getIdByDomain(domain: string): Promise<number> {
        const leId = await RedisStaticService.getValue(`socium:legal_entities:by_host:${domain}`)
        if (!leId) {
            throw new AppError('os-core:Legal entity id not found by domain in redis', {
                errorKey: 'DOMAIN_ACCESS_DENIED_ERROR',
            })
        }
        return Number(leId)
    }
    
    static async getDbConfigById(legalEntityId: number): Promise<{
        host: string,
        port: number,
        username: string,
        password: string,
        database: string,
    }> {
        const config = await RedisStaticService.getMapValue(this.getInfoLegalEntityRedisKey(legalEntityId))
        
        if (!config || !('system_db' in config)) {
            throw new AppError(`os-core:Config db not found by legal entity id(${legalEntityId}) in redis`, {
                errorKey: 'SERVER_SIDE_ERROR',
            })
        }
        
        const systemDb = JSON.parse(config.system_db)
        
        if (
            !systemDb?.port ||
            !systemDb?.port ||
            !systemDb?.username ||
            !systemDb?.password ||
            !systemDb?.database
        ) {
            throw new AppError(`os-core:Config fields db not found by legal entity id(${legalEntityId}) in redis`, {
                errorKey: 'SERVER_SIDE_ERROR',
            })
        }
        return {
            host: systemDb.host,
            port: Number(systemDb.port),
            username: systemDb.username,
            password: systemDb.password,
            database: systemDb.database,
        }
    }
    
    private static getInfoLegalEntityRedisKey(legalEntityId: number) {
        return `socium:legal_entities:by_id:${legalEntityId}`
    }
    
}