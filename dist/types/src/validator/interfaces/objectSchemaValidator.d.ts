import { SchemaValidator } from "..";
import { ExtendObjectValidatorResult } from "../core";
export interface ObjectSchemaValidator<Value extends object> extends SchemaValidator<Value> {
    merge<NewValue extends object>(schema: SchemaValidator<NewValue>): ObjectSchemaValidator<ExtendObjectValidatorResult<Value, NewValue>>;
    parseJsonIfString(): this;
    partial(): ObjectSchemaValidator<Partial<Value>>;
}
