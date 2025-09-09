import { NumberValidator, SchemaValidatorType, ZodValidatorImp } from "../core";
import { ZodNumber } from 'zod';
export declare class NumberValidatorIml extends ZodValidatorImp<number, ZodNumber> implements NumberValidator {
    readonly _value: number;
    constructor(options?: {
        coerce?: boolean;
    });
    min(minLength: number, message?: string): this;
    max(maxLength: number, message?: string): this;
    int(message?: string): this;
    getType(): SchemaValidatorType;
}
