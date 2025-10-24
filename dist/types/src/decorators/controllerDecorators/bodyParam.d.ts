import { SchemaValidator, SchemaValidatorRefineEffect } from "../../validator";
import { DecoratorParam } from "../core";
export declare const BodyParam: <Value extends unknown>(key: string, schema?: SchemaValidator<Value> | SchemaValidatorRefineEffect<Value>) => DecoratorParam<string | number>;
export declare const BodyParamOptional: <Value extends unknown>(key: string, schema?: SchemaValidator<Value> | SchemaValidatorRefineEffect<Value>) => DecoratorParam<string | number>;
