import { LiteralValidator, SchemaValidatorType, ZodValidatorImp } from "../core";
export declare class LiteralValidatorIml<Value extends string | number> extends ZodValidatorImp<Value> implements LiteralValidator<Value> {
    readonly _value: Value;
    constructor(value: Value);
    getType(): SchemaValidatorType;
}
