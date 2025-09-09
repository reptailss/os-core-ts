import {z, ZodRecord} from 'zod'
import { SchemaValidator } from '@validator'
import {
    KeySchemaRecordValidator, RecordValidator, SafeParseResultZodValidator,
    SchemaValidatorType, StringValidator, ValidateResult, ValueRecordTypeValidator, ZodValidatorImp,
} from '@validator/core'




export class RecordValidatorIml<
    Key extends KeySchemaRecordValidator = StringValidator,
    Value extends SchemaValidator = SchemaValidator
> extends ZodValidatorImp<ValueRecordTypeValidator<Key['_value'], Value['_value']>, ZodRecord>
    implements RecordValidator<Key, Value> {

    readonly _value!: ValueRecordTypeValidator<Key['_value'], Value['_value']>

    private hasParseJsonIfString: boolean = false

    constructor(value: Value) {
        super(z.record(value as any))
    }

    public getType(): SchemaValidatorType {
        return 'record'
    }

    public parseJsonIfString(): this {
        this.hasParseJsonIfString = true
        return this
    }

    public validate(data: unknown): ValidateResult<ValueRecordTypeValidator<Key['_value'], Value['_value']>> {
        if (this.hasParseJsonIfString && typeof data === 'string') {
            try {
                return super.validate(JSON.parse(data))
            } catch (error) {
                return super.validate(data)
            }
        }

        return super.validate(data)
    }

    public safeParse(input: any): SafeParseResultZodValidator<ValueRecordTypeValidator<Key['_value'], Value['_value']>, ValueRecordTypeValidator<Key['_value'], Value['_value']>> {
        if (this.hasParseJsonIfString && typeof input.data === 'string') {
            try {
                input.data = JSON.parse(input.data)
            } catch (error) {
            }
        }
        return super.safeParse(input)
    }

    public _parse(input: any) {
        if (this.hasParseJsonIfString && typeof input.data === 'string') {
            try {
                input.data = JSON.parse(input.data)
            } catch (error) {
            }
        }

        return super._parse(input)
    }

    public _parseSync(input: any) {
        if (this.hasParseJsonIfString && typeof input.data === 'string') {
            try {
                input.data = JSON.parse(input.data)
            } catch (error) {
            }
        }
        return super._parseSync(input)
    }
}

