type MeasurementProductUnit = {
    id: number;
    code: string;
    name: string;
    description: string;
    short_name_uk: string;
    short_name_international: string;
    active: 0 | 1;
    date_add: string;
    date_update: string;
};
export declare class OsCoreMeasurementProductUnitsCashedByIdsService {
    private readonly syncIntervalInMinutes;
    private lastSyncDate;
    constructor(syncIntervalInMinutes?: number);
    getUnit(unitId: number): MeasurementProductUnit | null;
    getMapUnitNames(): Record<string, string>;
    syncUnits(unitIds: number[]): Promise<void>;
    private saveUnitsByIds;
    private checkHasUnitsInCashByIds;
}
export {};
