import {SchemaValidator, SchemaValidatorRefineEffect} from '@validator'
import {ControllerDecoratorsBuilder, DecoratorParam} from '@decorators/core'

type Values = string | number | Date | undefined | number[] | string[]
export const QueryParam = <Value extends Values>(
    key: string,
    schema?: SchemaValidator<Value> | SchemaValidatorRefineEffect<Value>,
): DecoratorParam<Value> => {

    return function(
        target,
        _propertyKey,
        _parameterIndex) {

        ControllerDecoratorsBuilder.addArgToMethod({
            target,
            _propertyKey,
            arg: {
                _parameterIndex,
                schema,
                key: 'QueryParam',
                fieldKey: key,
                required: true,
            },
        })
    }

}


export const QueryParamOptional = <Value extends Values>(
    key: string,
    schema?: SchemaValidator<Value> | SchemaValidatorRefineEffect<Value>,
): DecoratorParam<Value> => {

    return function(
        target,
        _propertyKey,
        _parameterIndex) {

        ControllerDecoratorsBuilder.addArgToMethod({
            target,
            _propertyKey,
            arg: {
                _parameterIndex,
                schema,
                key: 'QueryParam',
                fieldKey: key,
                required: false,
            },
        })
    }
}
