import {SystemRequestHelper} from '@helpers'
import {APP_CONFIG_OS_CORE} from '@appConfig'
import {AppError} from '@appError'

export class OsCorePtpClientUsersService {

    static async introspect({
                                token,
                                domain,
                            }: {
        domain: string
        token: string
    }): Promise<{
        userId?: number
        active: boolean
        exp_at: number
        exp_in: number
        type: 'ACCESS_TOKEN'
        client_id: string
        username: string
        scope: string
        system_token?: 0 | 1
        is_admin: 0 | 1
    }> {
        if (!APP_CONFIG_OS_CORE.urls.ptpUsersServiceUrl) {
            throw new AppError('Not found ptp users service url in env', {
                errorKey: 'SERVER_SIDE_ERROR',
            })
        }
        return SystemRequestHelper.get({
            url: APP_CONFIG_OS_CORE.urls.ptpUsersServiceUrl + '/introspect',
            headers: {
                token,
                domain,
            },
            serviceKey: 'ptp-users',
        })
    }

    static async getRoles({
                              openUserId,
                              domain,
                          }: {
        openUserId: number
        domain: string
    }): Promise<{
        isAdmin: boolean
    }> {
        if (!APP_CONFIG_OS_CORE.urls.ptpUsersServiceUrl) {
            throw new AppError('Not found ptp users service url in env', {
                errorKey: 'SERVER_SIDE_ERROR',
            })
        }

        const response = await SystemRequestHelper.get<{
            is_admin: 0 | 1
        }>({
            url: APP_CONFIG_OS_CORE.urls.ptpUsersServiceUrl + `/get-roles/${openUserId}`,
            headers: {
                domain,
            },
            serviceKey: 'ptp-core-users',
        })
        return {
            isAdmin: response.is_admin === 1,
        }
    }
}