import { PaginationQueryParams } from "../../pagination";
import { SchemaValidator } from "../../validator";
import { DecoratorParam } from "../core";
export declare const PaginationQueryParamsDec: <Row extends object>(schema: SchemaValidator<PaginationQueryParams<Row>>, options?: {
    in?: 'body' | 'query';
}) => DecoratorParam<PaginationQueryParams<Row>>;
