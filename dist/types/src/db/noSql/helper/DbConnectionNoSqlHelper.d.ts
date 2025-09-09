import { DbNoSqlOptions } from "../..";
export declare class DbConnectionNoSqlHelper {
    static getDbUrl(options: DbNoSqlOptions): string;
    static getDbOptions: (optionsDb?: Partial<DbNoSqlOptions> | undefined) => DbNoSqlOptions;
}
