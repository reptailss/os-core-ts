import {SchemaValidator} from '@validator'


export interface EnumValidator<T extends readonly string[]> extends SchemaValidator<T[number]> {
}
