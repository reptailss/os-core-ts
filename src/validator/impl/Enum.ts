import {EnumValidator, SchemaValidatorType, ZodValidatorImp} from '@validator/core'
import {z, ZodEnum} from 'zod'



export class EnumValidatorImpl<T extends readonly string[]> extends ZodValidatorImp<T[number], ZodEnum<any>> implements EnumValidator<T> {
    readonly _value!: T[number]

    constructor(value: T) {
        super(z.enum(value as any))

    }

    public getType(): SchemaValidatorType {
        return 'enum'
    }
}

