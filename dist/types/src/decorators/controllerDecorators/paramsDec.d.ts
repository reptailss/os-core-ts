import { DecoratorParam } from "../core";
import { SchemaValidator, SchemaValidatorRefineEffect } from "../../validator";
export declare const ParamsDec: <Value extends object = any>(schema: SchemaValidator<Value> | SchemaValidatorRefineEffect<Value>) => DecoratorParam<Value>;
