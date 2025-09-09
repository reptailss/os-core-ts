import {ControllerDecoratorsBuilder, DecoratorParam} from '@decorators/core'
import {SchemaValidator, SchemaValidatorRefineEffect} from '@validator'

export const ParamsDec = <
    Value extends object = any,
>(
    schema: SchemaValidator<Value> | SchemaValidatorRefineEffect<Value>,
): DecoratorParam<
    Value
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
                key: 'Params',
            },
        })
    }
}
