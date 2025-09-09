import {SchemaValidatorType, StringValidator, ZodValidatorImp} from '@validator/core'
import {z, ZodString} from 'zod'


export class StringValidatorIml extends ZodValidatorImp<string, ZodString> implements StringValidator {
    readonly _value!: string


    constructor() {
        super(z.string())
    }

    min(minLength: number, message?: string): this {
        this._schema = this._schema.min(minLength, message)
        return this
    }

    max(maxLength: number, message?: string): this {
        this._schema = this._schema.max(maxLength, message)
        return this
    }

    email(message?: string): this {
        this._schema = this._schema.email(message)
        return this
    }

    public getType(): SchemaValidatorType {
        return 'string'
    }
}

