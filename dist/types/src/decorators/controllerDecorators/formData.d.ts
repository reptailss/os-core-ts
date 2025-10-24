import { SchemaValidator, SchemaValidatorRefineEffect } from "../../validator";
import { DecoratorParam } from "../core";
export declare const AppFormData: <Row extends object = any>(schema: SchemaValidator<Row> | SchemaValidatorRefineEffect<Row>) => DecoratorParam<Row>;
