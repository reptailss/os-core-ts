import {FullUserInfo, UserInfo} from '@auth'
import {APP_CONFIG_OS_CORE} from '@appConfig'
import {AppError} from '@appError'
import {RequestHelper} from '@helpers'


export class AuthService {
	static async checkTokenAndGetUserInfo(token: string): Promise<UserInfo> {

		const response = await this.introspect(token)

		if (!response?.active || !response?.userId) {
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

	static async checkSystemTokenAndGetUserInfo(token: string): Promise<UserInfo> {
		const response = await this.introspect(token)
		if (!response?.userId) {
			throw new AppError('Url for validate token was send not valid response', {
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

	static async getFullUserInfoByToken(accessToken: string): Promise<FullUserInfo> {
		if (!APP_CONFIG_OS_CORE.urls.authServiceUrl) {
			throw new AppError('Not found auth api url in env')
		}
		return await RequestHelper.get<FullUserInfo>({
			url: APP_CONFIG_OS_CORE.urls.authServiceUrl + `/v1/userinfo?access_token=${accessToken}`,
		})
	}

	static async introspect(token: string): Promise<{
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

		return RequestHelper.post({
			url: APP_CONFIG_OS_CORE.urls.checkAuthServiceUrl,
			params: {
				token_type_hint: 'access_token',
				token: token.slice(7),
			},
		})
	}

}

