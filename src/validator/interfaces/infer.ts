import {SchemaValidator} from '@validator'

export type InferValidator<T extends SchemaValidator> = T['_value'];
