import { z, ZodRecord } from 'zod';
import { SchemaValidator } from "..";
import { KeySchemaRecordValidator, RecordValidator, SafeParseResultZodValidator, SchemaValidatorType, StringValidator, ValidateResult, ValueRecordTypeValidator, ZodValidatorImp } from "../core";
export declare class RecordValidatorIml<Key extends KeySchemaRecordValidator = StringValidator, Value extends SchemaValidator = SchemaValidator> extends ZodValidatorImp<ValueRecordTypeValidator<Key['_value'], Value['_value']>, ZodRecord> implements RecordValidator<Key, Value> {
    readonly _value: ValueRecordTypeValidator<Key['_value'], Value['_value']>;
    private hasParseJsonIfString;
    constructor(value: Value);
    getType(): SchemaValidatorType;
    parseJsonIfString(): this;
    validate(data: unknown): ValidateResult<ValueRecordTypeValidator<Key['_value'], Value['_value']>>;
    safeParse(input: any): SafeParseResultZodValidator<ValueRecordTypeValidator<Key['_value'], Value['_value']>, ValueRecordTypeValidator<Key['_value'], Value['_value']>>;
    _parse(input: any): z.ParseReturnType<any>;
    _parseSync(input: any): z.ParseReturnType<any>;
}
