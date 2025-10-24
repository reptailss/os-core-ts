import {SchemaValidator, SchemaValidatorRefineEffect} from '@validator'
import {ControllerDecoratorsBuilder, DecoratorParam} from '@decorators/core'

type Values = number | undefined
export const AppFormDataParamNum = <Value extends Values>(
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
                key: 'AppFormDataParamNum',
                fieldKey: key,
                required: true,
            },
        })
    }
}

export const AppFormDataParamNumOptional = <Value extends Values>(
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
                key: 'AppFormDataParamNum',
                fieldKey: key,
                required: false,
            },
        })
    }
}
