import {RedisStaticService} from '@redis'

type MeasurementProductUnit = {
    id: number
    code: string
    name: string
    description: string,
    short_name_uk: string
    short_name_international: string
    active: 0 | 1
    date_add: string
    date_update: string
}


export class OsCoreMeasurementUnitsService {
    private static buildProductRedisKey(unitId: number): string {
        return `socium:products_measurement_units:by_id:${unitId}`
    }

    static async getProductUnitFromRedis(unitId: number): Promise<MeasurementProductUnit | null> {
        const res = await RedisStaticService.getMapValue(this.buildProductRedisKey(unitId))
        if (!res || !('id' in res)) {
            return null
        }
        return {
            id: Number(res?.id),
            code: res?.code,
            name: res?.name,
            description: res?.description,
            short_name_uk: res?.short_name_uk,
            short_name_international: res?.short_name_international,
            active: res?.active?.toString() === '1' ? 1 : 0,
            date_add: res?.date_add,
            date_update: res?.date_update,
        }
    }

}
