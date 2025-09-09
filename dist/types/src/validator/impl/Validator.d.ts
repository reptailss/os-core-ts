import { SchemaValidator } from "..";
import { ArrayValidator, BooleanNumValidator, BooleanValidator, DateValidator, EnumValidator, KeySchemaRecordValidator, LiteralValidator, NumberValidator, ObjectValidator, ObjectValueSchemaValidator, RecordValidator, StringValidator, UnionValidator, UnionValueSchemaValidator, UnknownValidator } from "../core";
export declare class Validator {
    static string(): StringValidator;
    static number(): NumberValidator;
    static date(): DateValidator;
    static boolean(): BooleanValidator;
    static booleanNum(): BooleanNumValidator;
    static enum<Value extends readonly string[]>(value: Value): EnumValidator<Value>;
    static array<Value extends SchemaValidator>(value: Value): ArrayValidator<Value>;
    static union<Value extends UnionValueSchemaValidator>(value: Value): UnionValidator<Value>;
    static record<Key extends KeySchemaRecordValidator = StringValidator, Value extends SchemaValidator = SchemaValidator>(value: Value): RecordValidator<Key, Value>;
    static unknown(): UnknownValidator;
    static object<T extends ObjectValueSchemaValidator>(value: T): ObjectValidator<T>;
    static literal<Value extends string | number>(value: Value): LiteralValidator<Value>;
}
