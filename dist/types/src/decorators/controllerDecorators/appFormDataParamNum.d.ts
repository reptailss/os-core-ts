import { SchemaValidator, SchemaValidatorRefineEffect } from "../../validator";
import { DecoratorParam } from "../core";
type Values = number | undefined;
export declare const AppFormDataParamNum: <Value extends Values>(key: string, schema?: SchemaValidator<Value> | SchemaValidatorRefineEffect<Value>) => DecoratorParam<number>;
export declare const AppFormDataParamNumOptional: <Value extends Values>(key: string, schema?: SchemaValidator<Value> | SchemaValidatorRefineEffect<Value>) => DecoratorParam<number>;
export {};
