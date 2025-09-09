import { SafeParseResultZodValidator, ValidateResult } from "../core";
import { ZodTypeAny } from 'zod';
import { SchemaValidator } from "..";
export declare abstract class ZodValidatorImp<Value, ZodSchema extends ZodTypeAny = ZodTypeAny> {
    _schema: ZodSchema;
    constructor(schema: ZodSchema);
    validate(value: unknown): ValidateResult<Value>;
    optional(): this;
    nullable(): this;
    refine<RefinedOutput extends Value>(checkCb: (arg: Value) => boolean, message?: string): this;
    transform<NewValue>(cb: (oldValue: Value) => NewValue): SchemaValidator<NewValue>;
    safeParse(value: unknown): SafeParseResultZodValidator<Value, Value>;
    _parse(input: any): import("zod").ParseReturnType<any>;
    _parseSync(input: any): import("zod").ParseReturnType<any>;
}
