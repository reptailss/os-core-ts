import {OsCorePtpClientUsersService, OsCorePtpCoreGroupsService, OsCorePtpCoreUsersService} from '@services'
import {AppError} from '@appError'
import {appLogger} from '@logger'

export class PtpAdminChecker {
	static async coreOrClient({
								  openUserId,
								  domain,
							  }: {
		openUserId: number
		domain: string
	}): Promise<'ptp-core' | 'ptp-client'> {
		try {
			const roles = await OsCorePtpCoreUsersService.getRoles(openUserId)
			if (roles.isAdmin) {
				return 'ptp-core'
			}
		} catch (error) {
			appLogger.error('error check role ptp client users', error)
		}
		const roles = await OsCorePtpClientUsersService.getRoles({
			domain,
			openUserId,
		})
		if (!roles.isAdmin) {
			throw new AppError('User must be an admin of ptp core or ptp client', {
				errorKey: 'UNAUTHORIZED_ERROR',
			})
		}
		return 'ptp-client'
	}

	static async coreOrClientAndDomainIfNotCore({
													openUserId,
													domain,
													apiSecretKey,
													apiAccessKey,
												}: {
		openUserId: number
		domain: string
		apiAccessKey: string
		apiSecretKey: string
	}): Promise<{
		ptpGroupId: number
		ptpGroupCityId: number
	}> {
		const adminType = await this.coreOrClient({
			openUserId,
			domain,
		})
		const group = await OsCorePtpCoreGroupsService.getGroupByApiKeys({
			apiAccessKey,
			apiSecretKey,
		})
		if (!group) {
			throw new AppError('Not found group by api keys', {
				errorKey: 'NOT_FOUND_ERROR',
			})
		}
		if (adminType === 'ptp-core') {
			return {
				ptpGroupId: group.id,
				ptpGroupCityId: group.city_id,
			}
		}

		if (!group.domain || group.domain !== domain) {
			throw new AppError('Access denied for domain', {
				errorKey: 'UNAUTHORIZED_ERROR',
			})
		}
		return {
			ptpGroupId: group.id,
			ptpGroupCityId: group.city_id,
		}
	}
}
