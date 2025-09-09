import {NumberValidator, SchemaValidatorType, ZodValidatorImp} from '@validator/core'
import {z, ZodNumber} from 'zod'



export class NumberValidatorIml extends ZodValidatorImp<number, ZodNumber> implements NumberValidator {
    readonly _value!: number

    constructor(options?: {
        coerce?: boolean
    }) {
        if (options?.coerce !== false) {
            super(z.coerce.number())
        } else {
            super(z.number())
        }
    }

    public min(minLength: number, message?: string): this {
        this._schema = this._schema.min(minLength, message)
        return this
    }

    public max(maxLength: number, message?: string): this {
        this._schema = this._schema.max(maxLength, message)
        return this
    }

    public int(message?: string): this {
        this._schema = this._schema.int(message)
        return this
    }

    public getType(): SchemaValidatorType {
        return 'number'
    }
}

