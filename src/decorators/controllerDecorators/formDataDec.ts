import {SchemaValidator, SchemaValidatorRefineEffect} from '@validator'
import {ControllerDecoratorsBuilder, DecoratorParam} from '@decorators/core'

export const FormDataDec = <Row extends object = any>(
    schema: SchemaValidator<Row> | SchemaValidatorRefineEffect<Row>,
): DecoratorParam<Row> => {
    return function(
        target,
        _propertyKey,
        _parameterIndex,
    ) {
        ControllerDecoratorsBuilder.addArgToMethod({
            target,
            _propertyKey,
            arg: {
                _parameterIndex,
                schema,
                key: 'FormData',
            },
        })
    }
}
