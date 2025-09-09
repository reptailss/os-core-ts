import { IModelNoSql } from "../..";
export declare class DropperModelNoSql {
    static drop(model: IModelNoSql<any>): Promise<number>;
    static multiDropByYearMonthDateRange({ getModelCb, dateStart, dateEnd, }: {
        getModelCb: (props: {
            year: number;
            month: number;
        }) => Promise<IModelNoSql<any>>;
        dateStart: Date;
        dateEnd: Date;
    }): Promise<{
        collectionsCount: number;
        documentsCount: number;
    }>;
}
