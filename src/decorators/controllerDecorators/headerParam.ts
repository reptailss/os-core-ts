import {SchemaValidator, SchemaValidatorRefineEffect} from '@validator'
import {ControllerDecoratorsBuilder, DecoratorParam} from '@decorators/core'

type Values = string | number | Date | undefined | number[] | string[]
export const HeaderParam = <Value extends Values>(
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
                key: 'HeaderParam',
                fieldKey: key,
                required: true,
            },
        })
    }
}

export const HeaderParamOptional = <Value extends Values>(
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
                key: 'HeaderParam',
                fieldKey: key,
                required: false,
            },
        })
    }
}