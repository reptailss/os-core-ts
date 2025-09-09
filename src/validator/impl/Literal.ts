import {LiteralValidator, SchemaValidatorType, ZodValidatorImp} from '@validator/core'
import {z} from 'zod'



export class LiteralValidatorIml<Value extends string | number> extends ZodValidatorImp<Value> implements LiteralValidator<Value> {
    readonly _value!: Value

    constructor(value: Value) {
        super(z.literal(value))
    }

    public getType(): SchemaValidatorType {
        return 'literal'
    }

}

