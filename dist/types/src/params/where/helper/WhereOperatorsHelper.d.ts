import { PermittedWhereOperator } from "../..";
export declare class WhereOperatorsHelper {
    static parseOperatorAndKey<Row extends object>(str: string): {
        key: keyof Row;
        operator: PermittedWhereOperator | null;
    };
}
