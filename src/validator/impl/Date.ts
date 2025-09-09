import {z} from 'zod'
import {ZodDate} from 'zod/lib/types'
import {DateValidator, SchemaValidatorType, ZodValidatorImp} from '@validator/core'



export class DateValidatorImpl extends ZodValidatorImp<Date, ZodDate> implements DateValidator {
    readonly _value!: Date

    constructor(options?: {
        coerce?: boolean
    }) {
        if (options?.coerce !== false) {
            super(z.coerce.date())
        } else {
            super(z.date())
        }
    }

    public min(minDate: Date, message?: string): this {
        this._schema = this._schema.min(minDate, message)
        return this
    }

    public max(maxDate: Date, message?: string): this {
        this._schema = this._schema.max(maxDate, message)
        return this
    }

    public getType(): SchemaValidatorType {
        return 'boolean'
    }
}

