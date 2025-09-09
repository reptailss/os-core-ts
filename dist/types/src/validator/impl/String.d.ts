import { SchemaValidatorType, StringValidator, ZodValidatorImp } from "../core";
import { ZodString } from 'zod';
export declare class StringValidatorIml extends ZodValidatorImp<string, ZodString> implements StringValidator {
    readonly _value: string;
    constructor();
    min(minLength: number, message?: string): this;
    max(maxLength: number, message?: string): this;
    email(message?: string): this;
    getType(): SchemaValidatorType;
}
