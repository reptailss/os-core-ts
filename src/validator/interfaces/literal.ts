import {SchemaValidator} from '@validator'


export interface LiteralValidator<Value extends string | number> extends SchemaValidator<Value> {

}
