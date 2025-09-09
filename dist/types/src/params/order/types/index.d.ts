export type OrderParams<Row extends object, AllowedKeysOrder extends keyof Row = keyof Row> = {
    [K in keyof Row as K extends AllowedKeysOrder ? K : never]?: 'ASC' | 'DESC';
};
