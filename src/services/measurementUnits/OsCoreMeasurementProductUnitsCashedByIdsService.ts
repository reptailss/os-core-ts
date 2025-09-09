import {AppError} from '@appError'
import {appLogger} from '@logger'
import {OsCoreMeasurementUnitsService} from '@services'


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

const unitsMap: Record<string, MeasurementProductUnit> = {}

export class OsCoreMeasurementProductUnitsCashedByIdsService {
    private lastSyncDate: Date | null = null


    constructor(private readonly syncIntervalInMinutes: number = 90) {
    }

    public getUnit(unitId: number): MeasurementProductUnit | null {
        if (!this.lastSyncDate) {
            throw new AppError('No units synchronization. You must call syncUnits() before calling', {
                errorKey: 'SERVER_SIDE_ERROR',
            })
        }
        if (!(unitId in unitsMap)) {
            return null
        }
        return unitsMap[unitId]
    }

    public getMapUnitNames(): Record<string, string> {
        const mapNames: Record<string, string> = {}
        for (const unitId in unitsMap) {
            mapNames[unitId] = unitsMap[unitId]?.name
        }
        return mapNames
    }

    public async syncUnits(unitIds: number[]): Promise<void> {
        if (!unitIds?.length) {
            return
        }
        const now = new Date()

        if (!this.lastSyncDate) {
            await this.saveUnitsByIds(unitIds)
            this.lastSyncDate = now
            return
        }
        const hasUnitsInCashByIds = this.checkHasUnitsInCashByIds(unitIds)
        if (!hasUnitsInCashByIds) {
            await this.saveUnitsByIds(unitIds)
            this.lastSyncDate = now
            return
        }
        const elapsedTimeInMinutes = (now.getTime() - this.lastSyncDate.getTime()) / (1000 * 60)
        if (elapsedTimeInMinutes < this.syncIntervalInMinutes) {
            return
        }
        await this.saveUnitsByIds(unitIds)
        this.lastSyncDate = now
    }

    private async saveUnitsByIds(unitIds: number[]) {
        appLogger.info('Start sync units')
        for (const unitId of unitIds) {
            const unit = await OsCoreMeasurementUnitsService.getProductUnitFromRedis(unitId)
            if (!unit) {
                appLogger.error('Not found unit in redis', unitId)
                continue
            }
            unitsMap[unitId] = unit
        }
        appLogger.info(`End sync units.New units count ${Object.keys(unitsMap)?.length}`)
    }

    private checkHasUnitsInCashByIds(unitIds: number[]): boolean {
        let hasUnitsInCashIds = true
        for (const unitId of unitIds) {
            if (unitId in unitsMap) {
                continue
            }
            hasUnitsInCashIds = false
            break
        }
        return hasUnitsInCashIds
    }


}

