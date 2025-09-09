import {SchemaValidator} from '@validator'


export interface StringValidator extends SchemaValidator<string> {
    min(minLength: number, message?: string): this;

    max(minLength: number, message?: string): this;

    email(message?: string): this;
}
