import { SchemaValidator } from "..";
import { ExtendObjectValidatorResult, ObjectResultTypeValidator, ObjectValidator, ObjectValueSchemaValidator, SafeParseResultZodValidator, SchemaValidatorType, ValidateResult, ZodValidatorImp } from "../core";
import { z, ZodObject } from 'zod';
export declare class ObjectValidatorImpl<T extends ObjectValueSchemaValidator, Catchall extends SchemaValidator = SchemaValidator, Value = ObjectResultTypeValidator<T, Catchall>> extends ZodValidatorImp<Value, ZodObject<any>> implements ObjectValidator<T, Catchall, Value> {
    readonly _value: Value;
    private hasParseJsonIfString;
    constructor(initialShape?: T);
    partial(): ObjectValidator<T, Catchall, Partial<Value>>;
    merge<R extends ObjectValueSchemaValidator, Catchall extends SchemaValidator = SchemaValidator, NewValue = ObjectResultTypeValidator<R, Catchall>>(newSchema: ObjectValidator<R, Catchall, NewValue>): ObjectValidator<ExtendObjectValidatorResult<T, R>, Catchall, ExtendObjectValidatorResult<Value, NewValue>>;
    parseJsonIfString(): this;
    getShape(): T;
    getType(): SchemaValidatorType;
    validate(data: unknown): ValidateResult<Value>;
    safeParse(input: any): SafeParseResultZodValidator<Value, Value>;
    _parse(input: any): z.ParseReturnType<any>;
    _parseSync(input: any): z.ParseReturnType<any>;
}
