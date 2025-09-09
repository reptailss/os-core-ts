import {APP_CONFIG_OS_CORE} from '@appConfig'
import {AppError} from '@appError'
import {SystemRequestHelper} from '@helpers'
import {RowResult} from '@responseFormat'
import {RedisStaticService} from '@redis'
import {appLogger} from '@logger'

type PtpGroup = {
	api_access_keys: string
	api_secret_key: string
	open_user_id: number
	name: string
	description: string
	city_id: number
	active: 0 | 1
	hide: 0 | 1
	id: number
	domain: string
}

export class OsCorePtpCoreGroupsService {

	static async getGroupByApiKeys({
									   apiAccessKey,
									   apiSecretKey,
								   }: {
		apiAccessKey: string
		apiSecretKey: string
	}): Promise<PtpGroup | null> {

		const groupFromRedis = await this.getGroupByApiKeysFromRedis({
			apiAccessKey,
			apiSecretKey,
		})
		if (groupFromRedis) {
			return groupFromRedis
		}

		const groupFromApi = await this.getGroupByApiKeysFromApi({
			apiAccessKey,
			apiSecretKey,
		})

		if (!groupFromApi) {
			return null
		}

		try {
			await this.saveGroupToRedis(groupFromApi)
		} catch (error) {
			appLogger.error('error save group to redis', error)
		}
		return groupFromApi
	}

	static async saveGroupToRedis(ptpGroup: PtpGroup): Promise<void> {

		await RedisStaticService.setMapValue(
			this.buildGroupRedisKey({
				apiAccessKey: ptpGroup.api_access_keys,
				apiSecretKey: ptpGroup.api_secret_key,
			}),
			{
				api_access_keys: ptpGroup.api_access_keys,
				api_secret_key: ptpGroup.api_secret_key,
				open_user_id: ptpGroup.open_user_id.toString(),
				name: ptpGroup.name,
				description: ptpGroup.description,
				city_id: ptpGroup.city_id.toString(),
				active: ptpGroup.active.toString(),
				hide: ptpGroup.hide.toString(),
				id: ptpGroup.id.toString(),
				domain: ptpGroup.domain,
			},
		)
	}

	static async deleteGroupFromRedis({
										  apiAccessKey,
										  apiSecretKey,
									  }: {
		apiAccessKey: string
		apiSecretKey: string
	}): Promise<void> {

		await RedisStaticService.deleteValue(this.buildGroupRedisKey({
			apiAccessKey,
			apiSecretKey,
		}))
	}

	private static async getGroupByApiKeysFromRedis({
														apiAccessKey,
														apiSecretKey,
													}: {
		apiAccessKey: string
		apiSecretKey: string
	}): Promise<PtpGroup | null> {

		const ptpGroup = await RedisStaticService.getMapValue(this.buildGroupRedisKey({
			apiAccessKey,
			apiSecretKey,
		}))

		if (!ptpGroup || !('id' in ptpGroup)) {
			return null
		}

		return {
			api_access_keys: ptpGroup.api_access_keys,
			api_secret_key: ptpGroup.api_secret_key,
			open_user_id: Number(ptpGroup.open_user_id),
			name: ptpGroup.name,
			description: ptpGroup.description,
			city_id: Number(ptpGroup.city_id),
			active: Number(ptpGroup.active) as 0 | 1,
			hide: Number(ptpGroup.hide) as 0 | 1,
			id: Number(ptpGroup.id),
			domain: ptpGroup.domain,
		}
	}

	private static async getGroupByApiKeysFromApi({
													  apiAccessKey,
													  apiSecretKey,
												  }: {
		apiAccessKey: string
		apiSecretKey: string
	}): Promise<PtpGroup | null> {
		if (!APP_CONFIG_OS_CORE.urls.ptpCoreGroupsServiceUrl) {
			throw new AppError('Not found ptp users service url in env', {
				errorKey: 'SERVER_SIDE_ERROR',
			})
		}
		try {
			const response = await SystemRequestHelper.get<RowResult<PtpGroup>>({
				url: APP_CONFIG_OS_CORE.urls.ptpCoreGroupsServiceUrl + '/get-by-api-keys',
				headers: {
					api_access_key: apiAccessKey,
					api_secret_key: apiSecretKey,
				},
				serviceKey: 'ptp-core-groups',
			})

			if (!response?.row?.id) {
				return null
			}
			return response.row
		} catch (error) {
			appLogger.error('os-core-ts:not found ptp group from api', error)
			return null
		}
	}

	private static buildGroupRedisKey({
										  apiAccessKey,
										  apiSecretKey,
									  }: {
		apiAccessKey: string
		apiSecretKey: string
	}): string {
		return `ptp_core:api_groups:${apiAccessKey}_${apiSecretKey}`
	}

}