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
export declare class OsCoreMeasurementUnitsService {
    private static buildProductRedisKey;
    static getProductUnitFromRedis(unitId: number): Promise<MeasurementProductUnit | null>;
}
export {};
