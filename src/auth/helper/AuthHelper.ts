import {AppError} from '@appError'
import { AppRequest} from '@appRequest'



export class AuthHelper {
	static getTokenFromReq(req: AppRequest): string {
		if (!req.headers?.authorization) {
			throw new AppError('os-core:Token not found in headers', {
				errorKey: 'HEADER_VALIDATION_ERROR',
			})
		}
		return req.headers?.authorization
	}

	static buildAuthHeaders(authToken: string): {
		authorization: string
	} {
		return {
			authorization: authToken,
		}
	}
}


