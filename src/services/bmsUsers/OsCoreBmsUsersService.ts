import { appLogger } from '@logger'
import {RedisStaticService} from '@redis'
import {APP_CONFIG_OS_CORE} from '@appConfig'
import {AppError} from '@appError'
import {SystemEndpointsHelper, SystemRequestHelper} from '@helpers'
import { OsCoreLegalEntityService } from '@services'

type BmsUser = {
    id: number
    socium_user_id: number
    open_id: number
    parent_open_id: number
    picture: string | null
    family_name: string
    given_name: string
    middle_name: string | null
    email: string | null
    birthdate: string | null
    gender: string
    type_ids: string | null
    active: 0 | 1
}

export class OsCoreBmsUsersService {

    public static async saveBmsUserToRedis({
                                               legalEntityId,
                                               bmsUser,
                                           }: {
        legalEntityId: number,
        bmsUser: BmsUser
    }): Promise<void> {

        await RedisStaticService.setValue(
            this.buildBmsUserByOpenIdRedisKey(bmsUser.open_id, legalEntityId),
            bmsUser.id.toString(),
        )

        await RedisStaticService.setMapValue(
            this.buildBmsUserByUserIdRedisKey(bmsUser.id, legalEntityId),
            {
                id: bmsUser.id.toString(),
                socium_user_id: bmsUser.socium_user_id.toString(),
                open_id: bmsUser.open_id.toString(),
                parent_open_id: bmsUser.parent_open_id.toString(),
                picture: bmsUser.picture || '',
                family_name: bmsUser.family_name || '',
                given_name: bmsUser.given_name || '',
                middle_name: bmsUser.middle_name || '',
                email: bmsUser.email || '',
                birthdate: bmsUser.birthdate || '',
                gender: bmsUser.gender || '',
                type_ids: bmsUser.type_ids || '',
                active: bmsUser.active.toString(),
            },
        )
    }

    static async deleteUserFromRedis({
                                         bmsUserId,
                                         openUserId,
                                         legalEntityId,
                                     }: {
        openUserId: number
        bmsUserId: number
        legalEntityId: number
    }): Promise<void> {

        await RedisStaticService.deleteValue(this.buildBmsUserByOpenIdRedisKey(openUserId, legalEntityId))

        await RedisStaticService.deleteValue(this.buildBmsUserByUserIdRedisKey(bmsUserId, legalEntityId))
    }

    static async getBmsUserByOpenUserIdAndLegalEntityId(openUserId: number, legalEntityId: number): Promise<BmsUser | null> {

        const userFromRedis = await this.getBmsUserByOpenUserIdFromRedis(openUserId, legalEntityId)

        if (userFromRedis) {
            return userFromRedis
        }

        const domain = await OsCoreLegalEntityService.getDomainById(legalEntityId)

        if (!domain) {
            return null
        }

        const userFromApi = await this.getBmsUserByOpenUserFromApi(openUserId, domain)

        if (!userFromApi) {
            return null
        }

        await this.saveBmsUserToRedis({legalEntityId, bmsUser: userFromApi})

        return userFromApi
    }

    static async getBmsUserByOpenUserIdFromRedis(openUserId: number, legalEntityId: number): Promise<BmsUser | null> {

        const userId = await RedisStaticService.getValue(this.buildBmsUserByOpenIdRedisKey(openUserId, legalEntityId))

        if (!userId) {
            return null
        }

        const bmsUser = await RedisStaticService.getMapValue(this.buildBmsUserByUserIdRedisKey(Number(userId), legalEntityId))

        if (!bmsUser || !('id' in bmsUser)) {
            return null
        }

        return {
            id: Number(bmsUser.id),
            socium_user_id: Number(bmsUser.socium_user_id),
            open_id: openUserId,
            parent_open_id: Number(bmsUser.parent_open_id || 0),
            picture: bmsUser.picture || null,
            family_name: bmsUser.family_name,
            given_name: bmsUser.given_name,
            middle_name: bmsUser.middle_name || null,
            email: bmsUser.email || null,
            birthdate: bmsUser.birthdate || null,
            gender: bmsUser.gender,
            type_ids: bmsUser.type_ids || null,
            active: Number(bmsUser.active) as 1 | 0,
        }
    }

    static async getBmsUserByOpenUserFromApi(openUserId: number, domain: string): Promise<BmsUser | null> {
        if (!APP_CONFIG_OS_CORE.urls.bmsUsersServiceUrl) {
            throw new AppError('Not found bms users api url in env', {
                errorKey: 'SERVER_SIDE_ERROR',
            })
        }

        try {
            const responseUserFromApi = await SystemRequestHelper.get<{
                row: BmsUser
            }>({
                serviceKey: 'bms_users',
                params: {
                    open_id: openUserId,
                },
                headers: {
                    origin: domain,
                },
                url: APP_CONFIG_OS_CORE.urls.bmsUsersServiceUrl + SystemEndpointsHelper.buildSystemEndpointUrl('/get-by-open-id'),
            })

            if (!responseUserFromApi?.row) {
                appLogger.error('os-core-ts:not found from api bms user')
                return null
            }
            return {
                id: responseUserFromApi.row.id,
                socium_user_id: responseUserFromApi.row.socium_user_id,
                open_id: openUserId,
                parent_open_id: responseUserFromApi.row.parent_open_id,
                picture: responseUserFromApi.row.picture,
                family_name: responseUserFromApi.row.family_name,
                given_name: responseUserFromApi.row.given_name,
                middle_name: responseUserFromApi.row.middle_name,
                email: responseUserFromApi.row.email,
                birthdate: responseUserFromApi.row.birthdate,
                gender: responseUserFromApi.row.gender,
                type_ids: responseUserFromApi.row.type_ids,
                active: responseUserFromApi.row.active,
            }
        } catch (error) {
            appLogger.error('os-core-ts:not found from api bms user', error)
            return null
        }
    }


    private static buildBmsUserByOpenIdRedisKey(openUserId: number, legalEntityId: number): string {
        return `socium_bms:${legalEntityId}:users:by_open_id:${openUserId}`
    }

    private static buildBmsUserByUserIdRedisKey(userId: number, legalEntityId: number): string {
        return `socium_bms:${legalEntityId}:users:by_id:${userId}`
    }

}
