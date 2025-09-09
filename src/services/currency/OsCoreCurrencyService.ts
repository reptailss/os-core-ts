import {RedisStaticService} from '@redis'

type Currency = {
	id: number
	name: string
	iso: string
	value: number
	legal_entity_id: number
	active: 0 | 1
	is_default: 0 | 1
	hide: 0 | 1
	date_add: string
	date_update: string
}

export class OsCoreCurrencyService {
	private static buildRedisKey(currencyId: number): string {
		return `socium:currencies:by_id:${currencyId}`
	}

	static async getCurrencyFromRedis(currencyId: number): Promise<Currency | null> {
		const res = await RedisStaticService.getMapValue(this.buildRedisKey(currencyId))
		if (!res || !('id' in res)) {
			return null
		}
		return {
			id: Number(res?.id),
			name: res?.name,
			iso: res?.iso,
			value: res?.value ? Number(res?.value) : 0,
			legal_entity_id: Number(res?.legal_entity_id),
			active: res?.active?.toString() === '1' ? 1 : 0,
			is_default: res?.active?.toString() === '1' ? 1 : 0,
			hide: res?.active?.toString() === '1' ? 1 : 0,
			date_add: res?.date_add,
			date_update: res?.date_update,
		}
	}

}
