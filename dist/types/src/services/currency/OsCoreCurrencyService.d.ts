type Currency = {
    id: number;
    name: string;
    iso: string;
    value: number;
    legal_entity_id: number;
    active: 0 | 1;
    is_default: 0 | 1;
    hide: 0 | 1;
    date_add: string;
    date_update: string;
};
export declare class OsCoreCurrencyService {
    private static buildRedisKey;
    static getCurrencyFromRedis(currencyId: number): Promise<Currency | null>;
}
export {};
