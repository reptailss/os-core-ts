import {z, ZodUnion} from 'zod'
import {SchemaValidatorType, UnionValidator, UnionValueSchemaValidator, ZodValidatorImp} from '@validator/core'


export class UnionValidatorIml<
    T extends UnionValueSchemaValidator,
> extends ZodValidatorImp<T[number]['_value'], ZodUnion<any>> implements UnionValidator<T> {

    readonly _value!: T[number]['_value']

    constructor(schema: T) {
        super(z.union(schema as any))
    }

    public getType(): SchemaValidatorType {
        return 'union'
    }
}

