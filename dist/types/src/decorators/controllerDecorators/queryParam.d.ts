import { SchemaValidator, SchemaValidatorRefineEffect } from "../../validator";
import { DecoratorParam } from "../core";
type Values = string | number | Date | undefined | number[] | string[];
export declare const QueryParam: <Value extends Values>(key: string, schema?: SchemaValidator<Value> | SchemaValidatorRefineEffect<Value>) => DecoratorParam<Value>;
export declare const QueryParamOptional: <Value extends Values>(key: string, schema?: SchemaValidator<Value> | SchemaValidatorRefineEffect<Value>) => DecoratorParam<Value>;
export {};
