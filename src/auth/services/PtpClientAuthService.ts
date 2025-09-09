import {PtpClientUserInfo} from '@auth'
import {AppError} from '@appError'
import {OsCorePtpClientUsersService} from '@services'


export class PtpClientAuthService {
	static async checkTokenAndGetUserInfo({
											  token,
											  domain,
											  roles,
										  }: {
		token: string,
		domain: string
		roles?: Array<'admin'>
	}): Promise<PtpClientUserInfo> {

		const response = await OsCorePtpClientUsersService.introspect({
			token,
			domain,
		})

		if (!response?.active || !response?.userId) {
			throw new AppError('Invalid bearer token', {
				errorKey: 'INVALID_BEARER_TOKEN_ERROR',
			})
		}

		if (
			roles &&
			roles.length &&
			roles.includes('admin') &&
			response.is_admin !== 1
		) {
			throw new AppError(`User must be an admin role`, {
				errorKey: 'UNAUTHORIZED_ERROR',
			})
		}

		return {
			open_user_id: response.userId,
			user_name: response.username,
			is_admin: response.is_admin === 1,
			is_system: response.system_token === 1,
		}
	}


}

