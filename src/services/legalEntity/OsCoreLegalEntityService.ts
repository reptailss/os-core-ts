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

    static async getDomainById(legalEntityId: number): Promise<string> {
        const info = await RedisStaticService.getMapValue(this.getInfoLegalEntityRedisKey(legalEntityId))

        if (!info) {
            throw new AppError(`os-core:Not found legal entity info id in redis`, {
                errorKey: 'NOT_FOUND_ERROR',
            })
        }
        if (typeof info?.bms_host !== 'string') {
            throw new AppError(`os-core:Domain not found by Legal entity id in redis`, {
                errorKey: 'NOT_FOUND_ERROR',
            })
        }

        return info.bms_host
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

    static async getInfoById(legalEntityId: number): Promise<{
        name: string
        typeId: number
        ownerSociumUserId: number | null
    }> {
        const info = await RedisStaticService.getMapValue(this.getInfoLegalEntityRedisKey(legalEntityId))
        if (!info) {
            throw new AppError(`os-core:Legal entity info not found by legal entity id(${legalEntityId}) in redis`, {
                errorKey: 'NOT_FOUND_ERROR',
            })
        }
        return {
            name: typeof info?.name === 'string' ? info.name : '',
            typeId: typeof info?.type_id === 'string' ? Number(info.type_id) : 0,
            ownerSociumUserId: typeof info?.owner_socium_user_id === 'string' ? Number(info.owner_socium_user_id) : 0,
        }
    }


    static async getBmsSettingsById(legalEntityId: number): Promise<{
        logo: string | null
    }> {
        const settings = await RedisStaticService.getMapValue(`socium_bms:${legalEntityId}:settings`)

        if (!settings) {
            throw new AppError(`os-core:Legal entity bms settings not found by legal entity id(${legalEntityId}) in redis`, {
                errorKey: 'NOT_FOUND_ERROR',
            })
        }
        return {
            logo: typeof settings?.logo === 'string' ? settings.logo : null,
        }
    }

    private static getInfoLegalEntityRedisKey(legalEntityId: number) {
        return `socium:legal_entities:by_id:${legalEntityId}`
    }

}