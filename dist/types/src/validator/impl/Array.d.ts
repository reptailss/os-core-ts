import { z } from 'zod';
import { SchemaValidator } from "..";
import { ArrayValidator, SafeParseResultZodValidator, SchemaValidatorType, ValidateResult, ZodValidatorImp } from "../core";
import { ZodArray } from 'zod/lib/types';
export declare class ArrayValidatorIml<T extends SchemaValidator> extends ZodValidatorImp<T['_value'][], ZodArray<any>> implements ArrayValidator<T> {
    readonly _value: T['_value'][];
    private hasParseJsonIfString;
    constructor(schema: T);
    min(minLength: number, message?: string): this;
    max(maxLength: number, message?: string): this;
    getType(): SchemaValidatorType;
    parseJsonIfString(): this;
    validate(data: unknown): ValidateResult<T['_value'][]>;
    safeParse(input: any): SafeParseResultZodValidator<T['_value'][], T['_value'][]>;
    _parse(input: any): z.ParseReturnType<any>;
    _parseSync(input: any): z.ParseReturnType<any>;
}
