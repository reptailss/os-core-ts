import {ControllerDecoratorsBuilder, DecoratorParam} from '@decorators/core'

export const DomainDec: DecoratorParam<string> = (
    target,
    _propertyKey,
    _parameterIndex,
) => {
    ControllerDecoratorsBuilder.addArgToMethod({
        target,
        _propertyKey,
        arg: {
            _parameterIndex,
            key: 'Domain',
        },
    })
}

