import {SchemaValidator, SchemaValidatorRefineEffect} from '@validator'
import {ControllerDecoratorsBuilder, DecoratorParam} from '@decorators/core'

type Values = Date | undefined
export const QueryParamDate = <Value extends Values>(
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
                key: 'QueryParamDate',
                fieldKey: key,
                required: true,
            },
        })
    }
}


export const QueryParamDateOptional = <Value extends Values>(
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
                key: 'QueryParamDate',
                fieldKey: key,
                required: false,
            },
        })
    }
}
