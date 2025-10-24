import { WhereParams } from "../../params";
import { SchemaValidator } from "..";
export declare class WhereValidator {
    static getSchema<Row extends object>(rowSchema: SchemaValidator<Row>, onlyWhereKeys?: (keyof Row)[]): SchemaValidator<WhereParams<Row>>;
    private static getWhereSchemaByKeys;
    private static checkIsStringType;
    private static checkIsNumberType;
    private static checkIsDateType;
    private static checkIsPrimitiveType;
}
