import { SchemaValidator, SchemaValidatorRefineEffect } from "..";
export interface ObjectValidator<T extends ObjectValueSchemaValidator, Catchall extends SchemaValidator = SchemaValidator, Value = ObjectResultTypeValidator<T, Catchall>> extends SchemaValidator<Value> {
    partial(): ObjectValidator<T, Catchall, Partial<Value>>;
    merge<R extends ObjectValueSchemaValidator, Catchall extends SchemaValidator = SchemaValidator, NewValue = ObjectResultTypeValidator<R, Catchall>>(schema: ObjectValidator<R, Catchall, NewValue> | SchemaValidator<NewValue> | SchemaValidatorRefineEffect<NewValue>): ObjectValidator<ExtendObjectValidatorResult<T, R>, Catchall, ExtendObjectValidatorResult<Value, NewValue>>;
    parseJsonIfString(): this;
}
export type ExtendObjectValidatorResult<A, B> = {
    [K in keyof A as K extends keyof B ? never : K]: A[K];
} & {
    [K in keyof B]: B[K];
};
export type ObjectValueSchemaValidator = {
    [k: string]: SchemaValidator | SchemaValidatorRefineEffect;
};
type identity<T> = T;
type flatten<T> = identity<{
    [k in keyof T]: T[k];
}>;
type requiredKeys<T extends object> = {
    [k in keyof T]: undefined extends T[k] ? never : k;
}[keyof T];
type optionalKeys<T extends object> = {
    [k in keyof T]: undefined extends T[k] ? k : never;
}[keyof T];
type addQuestionMarks<T extends object, _O = any> = {
    [K in requiredKeys<T>]: T[K];
} & {
    [K in optionalKeys<T>]?: T[K];
} & {
    [k in keyof T]?: unknown;
};
export type baseObjectOutputType<Shape extends ObjectValueSchemaValidator> = {
    [k in keyof Shape]: Shape[k]['_value'];
};
type CatchallOutput<T extends SchemaValidator> = SchemaValidator extends T ? unknown : {
    [k: string]: T['_value'];
};
export type ObjectResultTypeValidator<Shape extends ObjectValueSchemaValidator, Catchall extends SchemaValidator> = flatten<addQuestionMarks<baseObjectOutputType<Shape>>> & CatchallOutput<Catchall>;
export {};
