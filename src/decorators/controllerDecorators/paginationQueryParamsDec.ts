import {PaginationQueryParams} from '@pagination'
import {SchemaValidator} from '@validator'
import {ControllerDecoratorsBuilder, DecoratorParam} from '@decorators/core'


export const PaginationQueryParamsDec = <Row extends object>(
    schema: SchemaValidator<PaginationQueryParams<Row>>,
    options?:{
        in?:'body' | 'query'
    }
): DecoratorParam<
    PaginationQueryParams<Row>
> => {
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
                key: 'PaginationQueryParams',
                in:options?.in || 'query'
            },
        })
    }
}
