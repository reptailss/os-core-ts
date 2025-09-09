import { BooleanValidator, SchemaValidatorType, ZodValidatorImp } from "../core";
export declare class BooleanValidatorImpl extends ZodValidatorImp<boolean> implements BooleanValidator {
    readonly _value: boolean;
    constructor(options?: {
        coerce?: boolean;
    });
    getType(): SchemaValidatorType;
}
