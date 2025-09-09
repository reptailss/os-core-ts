import { BooleanNumValidator, SchemaValidatorType, ZodValidatorImp } from "../core";
export declare class BooleanNumValidatorImpl extends ZodValidatorImp<0 | 1> implements BooleanNumValidator {
    readonly _value: 0 | 1;
    constructor();
    getType(): SchemaValidatorType;
}
