import { SchemaValidatorType, UnknownValidator, ZodValidatorImp } from "../core";
export declare class UnknownValidatorIml extends ZodValidatorImp<unknown> implements UnknownValidator {
    readonly _value: unknown;
    constructor();
    getType(): SchemaValidatorType;
}
