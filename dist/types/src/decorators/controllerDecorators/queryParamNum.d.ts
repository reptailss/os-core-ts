import { SchemaValidator, SchemaValidatorRefineEffect } from "../../validator";
import { DecoratorParam } from "../core";
type Values = number | undefined;
export declare const QueryParamNum: <Value extends Values>(key: string, schema?: SchemaValidator<Value> | SchemaValidatorRefineEffect<Value>) => DecoratorParam<Value>;
export declare const QueryParamNumOptional: <Value extends Values>(key: string, schema?: SchemaValidator<Value> | SchemaValidatorRefineEffect<Value>) => DecoratorParam<Value>;
export {};
