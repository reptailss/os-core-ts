import {SchemaValidator, SchemaValidatorRefineEffect} from '@validator'
import {ControllerDecoratorsBuilder, DecoratorParam} from '@decorators/core'

type Values = number | undefined
export const ParamNum = <Value extends Values>(
    key: string,
    schema?: SchemaValidator<Value> | SchemaValidatorRefineEffect<Value>,
): DecoratorParam<
    number
> => {
    return function(
        target,
        _propertyKey,
        _parameterIndex) {

        ControllerDecoratorsBuilder.addArgToMethod({
            target,
            _propertyKey,
            arg: {
                _parameterIndex,
                schema: schema,
                key: 'ParamNum',
                fieldKey: key,
                required: true,
            },
        })
    }
}


export const ParamNumOptional = <Value extends Values>(
    key: string,
    schema?: SchemaValidator<Value> | SchemaValidatorRefineEffect<Value>,
): DecoratorParam<
    number
> => {
    return function(
        target,
        _propertyKey,
        _parameterIndex) {

        ControllerDecoratorsBuilder.addArgToMethod({
            target,
            _propertyKey,
            arg: {
                _parameterIndex,
                schema: schema,
                key: 'ParamNum',
                fieldKey: key,
                required: false,
            },
        })
    }
}
