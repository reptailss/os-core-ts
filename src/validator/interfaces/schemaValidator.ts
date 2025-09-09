import {SchemaValidatorType, ValidateResult} from '@validator/core'

export interface SchemaValidator<
    Value = any,
> {
    readonly _value: Value;

    optional(): SchemaValidator<Value | undefined>;

    refine(
        checkCb: (arg: Value) => boolean,
        message?: string,
    ): SchemaValidatorRefineEffect<Value>;

    refine<Value>(
        checkCb: (arg: Value) => arg is Value,
        message?: string,
    ): SchemaValidatorRefineEffect<Value>;

    transform<NewValue>(cb: (oldValue: Value) => NewValue): SchemaValidator<NewValue>

    validate(data: unknown): ValidateResult<Value>;

    nullable(): SchemaValidator<Value | null>;

    getType(): SchemaValidatorType;

}

export type SchemaValidatorRefineEffect<Value = any> = Omit<SchemaValidator<Value>, 'optional'>