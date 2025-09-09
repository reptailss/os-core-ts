import { DecoratorParam } from "../core";
import { SchemaValidator, SchemaValidatorRefineEffect } from "../../validator";
export declare const BodyDec: <Row = any>(schema: SchemaValidator<Row> | SchemaValidatorRefineEffect<Row>) => DecoratorParam<Row>;
