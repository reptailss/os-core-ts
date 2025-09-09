import { EnumValidator, SchemaValidatorType, ZodValidatorImp } from "../core";
import { ZodEnum } from 'zod';
export declare class EnumValidatorImpl<T extends readonly string[]> extends ZodValidatorImp<T[number], ZodEnum<any>> implements EnumValidator<T> {
    readonly _value: T[number];
    constructor(value: T);
    getType(): SchemaValidatorType;
}
