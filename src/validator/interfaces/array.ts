import {SchemaValidator} from '@validator'

export interface ArrayValidator<
    T extends SchemaValidator,
> extends SchemaValidator<
    T['_value'][]
> {
    min(minLength: number, message?: string): this

    max(maxLength: number, message?: string): this

    parseJsonIfString():this

}
