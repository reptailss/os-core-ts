import {ControllerDecoratorsBuilder, DecoratorParam} from '@decorators/core'
import {SchemaValidator, SchemaValidatorRefineEffect} from '@validator'


export const Body = <Row = any>(
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
                key: 'Body',
            },
        })

    }
}

