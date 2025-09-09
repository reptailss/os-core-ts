import {BooleanValidator, SchemaValidatorType, ZodValidatorImp} from '@validator/core'
import {z} from 'zod'


export class BooleanValidatorImpl extends ZodValidatorImp<boolean> implements BooleanValidator {

    readonly _value!: boolean

    constructor(options?: {
        coerce?: boolean
    }) {

        if (options?.coerce !== false) {
            super(z.coerce.boolean())
        } else {
            super(z.boolean())
        }
    }

    public getType(): SchemaValidatorType {
        return 'boolean'
    }

}

