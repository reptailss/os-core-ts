import {SchemaValidatorType, UnknownValidator, ZodValidatorImp } from '@validator/core'
import {z} from 'zod'



export class UnknownValidatorIml extends ZodValidatorImp<unknown> implements UnknownValidator {
    readonly _value!: unknown

    constructor() {
        super(z.unknown())
    }

    public getType(): SchemaValidatorType {
        return 'unknown'
    }
}

