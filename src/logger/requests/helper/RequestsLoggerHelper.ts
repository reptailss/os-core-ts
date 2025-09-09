import path from 'path'
import {AppResponse} from '@appResponse'

export const FILE_NAME = `info.log`

export class RequestsLoggerHelper {
	static getDirPath(): string {
		const logDir = process.cwd()
		return path.join(logDir, 'logs', 'requests')
	}

	static getFilePath(): string {
		const dirPath = this.getDirPath()
		return path.join(dirPath, FILE_NAME)
	}

	static getErrorPropsFromBody(body?: string | object): {
		error: 0 | 1,
		errorCode: string | null
	} {
		if (!body || typeof body !== 'object') {
			return {
				error: 0,
				errorCode: null,
			}
		}
		if (!('error' in body)) {
			return {
				error: 0,
				errorCode: null,
			}
		}
		return {
			error: body.error ? 1 : 0,
			errorCode: 'error_code' in body ? body.error_code as string : null,
		}
	}

	static getUserIdFromResRequest(res: AppResponse): {
		openUserId: number | null,
		isSystem: 0 | 1 | null
	} {
		if (!('user' in res.locals) || !res.locals.user.open_user_id) {
			return {
				openUserId: null,
				isSystem: 0,
			}
		}
		return {
			openUserId: res.locals.user.open_user_id,
			isSystem: typeof res.locals.user.is_system !== 'undefined' ? res.locals.user.is_system ? 0 : 1 : null,
		}
	}

}