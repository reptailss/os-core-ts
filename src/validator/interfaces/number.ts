import {SchemaValidator} from '@validator'

export interface NumberValidator extends SchemaValidator<number> {
    min(minLength: number, message?: string): this;

    max(minLength: number, message?: string): this;

    int(message?: string): this
}
