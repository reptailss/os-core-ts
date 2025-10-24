import {SchemaValidator, SchemaValidatorRefineEffect} from '@validator'
import {
    ArrayValidator,
    ArrayValidatorIml,
    BooleanNumValidator,
    BooleanNumValidatorImpl,
    BooleanValidator,
    BooleanValidatorImpl,
    DateValidator,
    DateValidatorImpl,
    EnumValidator,
    EnumValidatorImpl,
    KeySchemaRecordValidator,
    LiteralValidator,
    LiteralValidatorIml,
    NumberValidator,
    NumberValidatorIml,
    ObjectValidator,
    ObjectValidatorImpl,
    ObjectValueSchemaValidator,
    RecordValidator,
    RecordValidatorIml,
    StringValidator,
    StringValidatorIml,
    UnionValidator,
    UnionValidatorIml,
    UnionValueSchemaValidator,
    UnknownValidator,
    UnknownValidatorIml,
} from '@validator/core'


export class Validator {
    static string(): StringValidator {
        return new StringValidatorIml()
    }

    static number(): NumberValidator {
        return new NumberValidatorIml()
    }

    static date(): DateValidator {
        return new DateValidatorImpl()
    }

    static boolean(): BooleanValidator {
        return new BooleanValidatorImpl()
    }

    static booleanNum(): BooleanNumValidator {
        return new BooleanNumValidatorImpl()
    }

    static enum<Value extends readonly string[]>(value: Value): EnumValidator<Value> {
        return new EnumValidatorImpl(value)
    }

    static array<Value extends (SchemaValidator | SchemaValidatorRefineEffect)>(value: Value): ArrayValidator<Value> {
        return new ArrayValidatorIml(value)
    }

    static union<Value extends UnionValueSchemaValidator>(value: Value): UnionValidator<Value> {
        return new UnionValidatorIml(value)
    }

    static record<
        Key extends KeySchemaRecordValidator = StringValidator,
        Value extends SchemaValidator = SchemaValidator
    >(value: Value): RecordValidator<Key, Value> {
        return new RecordValidatorIml(value)
    }

    static unknown(): UnknownValidator {
        return new UnknownValidatorIml()
    }

    static object<
        T extends ObjectValueSchemaValidator,
    >(value: T): ObjectValidator<T> {
        return new ObjectValidatorImpl(value) as any
    }

    static literal<Value extends string | number>(value: Value): LiteralValidator<Value> {
        return new LiteralValidatorIml(value)
    }

}

