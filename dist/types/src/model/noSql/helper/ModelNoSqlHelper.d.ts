import { OrderParams } from "../../../params";
export declare class ModelNoSqlHelper {
    static getCollectionNamesPaginationByDateRangeNoSql({ dateStart, dateEnd, }: {
        dateStart: string | Date;
        dateEnd: string | Date;
    }): string[];
    static getYearAndMothByCollectionName(collectionName: string): {
        year: number;
        month: number;
    };
    static checkReverseCollection<Row extends object>({ order, dateFilterKey, }: {
        order?: OrderParams<Row>;
        dateFilterKey: keyof Row;
    }): boolean;
}
