import {z} from 'zod'
import {SchemaValidator, SchemaValidatorRefineEffect} from '@validator'
import {
    ArrayValidator,
    SafeParseResultZodValidator,
    SchemaValidatorType,
    ValidateResult,
    ZodValidatorImp,
} from '@validator/core'
import {ZodArray} from 'zod/lib/types'




export class ArrayValidatorIml<
    T extends SchemaValidator | SchemaValidatorRefineEffect,
> extends ZodValidatorImp<
    T['_value'][],
    ZodArray<any>
> implements ArrayValidator<T> {

    readonly _value!: T['_value'][]

    private hasParseJsonIfString: boolean = false

    constructor(schema: T) {
        super(z.array(schema as any))
    }

    public min(minLength: number, message?: string): this {
        this._schema = this._schema.min(minLength, message)
        return this
    }

    public max(maxLength: number, message?: string): this {
        this._schema = this._schema.max(maxLength, message)
        return this
    }

    public getType(): SchemaValidatorType {
        return 'array'
    }

    public parseJsonIfString() {
        this.hasParseJsonIfString = true
        return this
    }

    public validate(data: unknown): ValidateResult<T['_value'][]> {
        if (this.hasParseJsonIfString && typeof data === 'string') {
            try {
                return super.validate(JSON.parse(data))
            } catch (error) {
                return super.validate(data)
            }
        }

        return super.validate(data)
    }

    public safeParse(input: any): SafeParseResultZodValidator<T['_value'][], T['_value'][]> {
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
