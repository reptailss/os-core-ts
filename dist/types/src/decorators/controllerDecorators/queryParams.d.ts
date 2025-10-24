import { SchemaValidator, SchemaValidatorRefineEffect } from "../../validator";
import { DecoratorParam } from "../core";
export declare const QueryParams: <Value extends object = any>(schema: SchemaValidator<Value> | SchemaValidatorRefineEffect<Value>) => DecoratorParam<Value>;
