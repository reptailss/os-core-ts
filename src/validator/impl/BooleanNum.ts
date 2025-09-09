import {BooleanNumValidator, SchemaValidatorType, ZodValidatorImp} from '@validator/core'
import {z} from 'zod'



export class BooleanNumValidatorImpl extends ZodValidatorImp<0 | 1> implements BooleanNumValidator {
    readonly _value!: 0 | 1

    constructor() {
        super(z
            .custom<0 | 1 | '0' | '1'>()
            .refine(
                (value) => {
                    return value === '0' || value === '1' || value === 0 || value === 1
                },
                'Must by 0 or 1',
            ).transform((value) => {
                if (typeof value === 'string') {
                    return Number(value)
                }
                return value
            }),
        )
    }

    public getType(): SchemaValidatorType {
        return 'booleanNum'
    }
}

