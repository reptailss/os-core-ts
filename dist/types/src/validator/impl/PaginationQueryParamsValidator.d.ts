import { OrderParams, WhereParams } from "../../params";
import { SchemaValidator } from "..";
import { SchemaValidatorType } from "../core";
import { PaginationQueryParams } from "../../pagination";
export declare class PaginationQueryParamsValidator {
    static getSchema<Row extends object>(rowSchema: SchemaValidator<Row>, options?: {
        onlyWhereKeys?: (keyof Row)[];
        onlyOrderKeys?: (keyof Row)[];
    }): SchemaValidator<PaginationQueryParams<Row>>;
    static getWhereSchemaByKeys<Row extends object>(rowSchema: SchemaValidator<Row>, onlyWhereKeys?: (keyof Row)[]): SchemaValidator<WhereParams<Row>>;
    static getOrderSchemaByKeys<Row extends object>(rowSchema: SchemaValidator<Row>, onlyOrderKeys?: (keyof Row)[]): SchemaValidator<OrderParams<Row>>;
    static checkIsStringType(type: SchemaValidatorType): boolean;
    static checkIsNumberType(type: SchemaValidatorType): boolean;
    static checkIsDateType(type: SchemaValidatorType): boolean;
    static checkIsPrimitiveType(type: SchemaValidatorType): boolean;
}
