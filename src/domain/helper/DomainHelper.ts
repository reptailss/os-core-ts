import {AppError} from '@appError'
import {AppRequest} from '@appRequest'

export class DomainHelper {
	static getDomainFromReq(request: AppRequest) {
		const origin = request.headers?.domain || request.headers?.origin || request.headers?.host || request.headers?.referer

		if (typeof origin !== 'string') {
			throw new AppError('os-core:Domain not found in headers', {
				errorKey: 'HEADER_VALIDATION_ERROR',
			})
		}
		const originArray = origin.split('//')
		if (!originArray?.length) {
			throw new AppError('os-core:Domain not valid', {
				errorKey: 'HEADER_VALIDATION_ERROR',
			})
		}
		return originArray[originArray?.length - 1].replace(/\//g, '')
	}

}



