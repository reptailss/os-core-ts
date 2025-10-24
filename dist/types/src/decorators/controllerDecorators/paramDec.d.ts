import { SchemaValidator, SchemaValidatorRefineEffect } from "../../validator";
import { DecoratorParam } from "../core";
type Values = string | undefined;
export declare const Param: <Value extends Values>(key: string, schema?: SchemaValidator<Value> | SchemaValidatorRefineEffect<Value>) => DecoratorParam<string | number>;
export declare const ParamOptional: <Value extends Values>(key: string, schema?: SchemaValidator<Value> | SchemaValidatorRefineEffect<Value>) => DecoratorParam<string | number>;
export {};
