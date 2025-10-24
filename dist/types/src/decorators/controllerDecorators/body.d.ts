import { DecoratorParam } from "../core";
import { SchemaValidator, SchemaValidatorRefineEffect } from "../../validator";
export declare const Body: <Row = any>(schema: SchemaValidator<Row> | SchemaValidatorRefineEffect<Row>) => DecoratorParam<Row>;
