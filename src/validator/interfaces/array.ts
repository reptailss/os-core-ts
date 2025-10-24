import {SchemaValidator, SchemaValidatorRefineEffect} from '@validator'

export interface ArrayValidator<
    T extends SchemaValidator | SchemaValidatorRefineEffect,
> extends SchemaValidator<
    T['_value'][]
> {
    min(minLength: number, message?: string): this

    max(maxLength: number, message?: string): this

    parseJsonIfString():this

}
