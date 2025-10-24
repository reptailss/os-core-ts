import { SchemaValidator } from "..";
import { PaginationQueryParams } from "../../pagination";
export declare class PaginationQueryParamsValidator {
    static getSchema<Row extends object>(rowSchema: SchemaValidator<Row>, options?: {
        onlyWhereKeys?: (keyof Row)[];
        onlyOrderKeys?: (keyof Row)[];
    }): SchemaValidator<PaginationQueryParams<Row>>;
    private static getOrderSchemaByKeys;
    private static checkIsPrimitiveType;
}
