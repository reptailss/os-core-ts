import {FullUserDto, UserDto} from '@auth'
import {APP_CONFIG_OS_CORE} from '@appConfig'
import {AppError} from '@appError'


export class AuthService {
    public static async checkTokenAndGetUser(token: string): Promise<UserDto> {
        
        const response = await this.introspect(token)
        
        if (!response.active || !response.userId) {
            throw new AppError('Invalid bearer token', {
                errorKey: 'INVALID_BEARER_TOKEN_ERROR',
            })
        }
        
        return {
            open_user_id: response.userId,
            user_name: response.username,
            is_system: response.system_token === 1,
        }
    }
    
    public static async checkSystemTokenAndGetUser(token: string): Promise<UserDto> {
        const response = await this.introspect(token)
        if (!response.active || !response.userId) {
            throw new AppError('Invalid bearer token', {
                errorKey: 'INVALID_BEARER_TOKEN_ERROR',
            })
        }
        const isSystem = response.system_token?.toString() === '1'
        
        if (!isSystem) {
            throw new AppError('The token must be system', {
                errorKey: 'INVALID_BEARER_TOKEN_ERROR',
            })
        }
        return {
            open_user_id: response.userId,
            user_name: response.username,
            is_system: isSystem,
        }
    }
    
    public static async getFullUserByToken(accessToken: string): Promise<FullUserDto> {
        if (!APP_CONFIG_OS_CORE.urls.authServiceUrl) {
            throw new AppError('Not found auth api url in env')
        }
        return this.requestApi<FullUserDto>({
            url: APP_CONFIG_OS_CORE.urls.authServiceUrl + `/v1/userinfo?access_token=${accessToken}`,
        })
    }
    
    public static async systemGetUserByOpenUserId(openUserId: number): Promise<{
        id: number
        family_name: string
        given_name: string
        middle_name: string | null
        email: string | null
        birthdate: string | null
        picture: string | null
        parent_id: number | null
        gender: 'male' | 'female' | null
    } | null> {
        if (!APP_CONFIG_OS_CORE.urls.authServiceUrl) {
            throw new AppError('Not found auth api url in env', {
                errorKey: 'SERVER_SIDE_ERROR',
            })
        }
        const response = await this.requestApi<{
            res: {
                id: number
                family_name: string
                given_name: string
                middle_name: string | null
                email: string | null
                birthdate: string | null
                picture: string | null
                parent_id: number | null
                gender: 'male' | 'female' | null
            }
        }>({
            url: APP_CONFIG_OS_CORE.urls.authServiceUrl + `/user/read?reqBody=${openUserId}`,
            headers: {
                Authorization: APP_CONFIG_OS_CORE.tokens.systemAuthToken,
            },
        })
        
        if (!response.res.id) {
            return null
        }
        return {
            id: response.res.id,
            birthdate: response.res.birthdate,
            email: response.res.email,
            given_name: response.res.given_name,
            middle_name: response.res.middle_name,
            parent_id: response.res.parent_id,
            family_name: response.res.family_name,
            picture: response.res.picture,
            gender:response.res.gender
        }
    }
    
    public static async introspect(token: string): Promise<{
        userId?: number
        active: boolean
        exp_at: number
        exp_in: number
        type: 'ACCESS_TOKEN'
        client_id: string
        username: string
        scope: string
        system_token?: 0 | 1
    }> {
        if (!APP_CONFIG_OS_CORE.urls.checkAuthServiceUrl) {
            throw new AppError('Not found check auth api url in env', {
                errorKey: 'SERVER_SIDE_ERROR',
            })
        }
        return this.requestApi<{
            userId?: number
            active: boolean
            exp_at: number
            exp_in: number
            type: 'ACCESS_TOKEN'
            client_id: string
            username: string
            scope: string
            system_token?: 0 | 1
        }>({
            url: `${APP_CONFIG_OS_CORE.urls.checkAuthServiceUrl}?token_type_hint=access_token&token=${token.slice(7)}`,
        })
        
    }
    
    private static async requestApi<Result>({
                                                url,
                                                headers,
                                            }: {
        url: string
        headers?: Record<string, string>
    }): Promise<Result> {
        let response
        try {
            response = await fetch(url, {
                headers,
                method: 'GET',
            })
        } catch (error) {
            throw new AppError('Service authorization request failed', {
                errorKey: 'UNAUTHORIZED_ERROR',
            })
        }
        const res = await response.json()
        if (
            'errorMsg' in res && res.errorMsg ||
            !response.ok
        ) {
            throw new AppError(res.errorMsg || 'Invalid bearer token', {
                errorKey: 'INVALID_BEARER_TOKEN_ERROR',
            })
        }
        return res as Result
    }
    
}

