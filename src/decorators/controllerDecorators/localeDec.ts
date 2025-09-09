import {ControllerDecoratorsBuilder, DecoratorParam} from '@decorators/core'

export const LocaleDec: DecoratorParam<string | null> = (
    target,
    _propertyKey,
    _parameterIndex,
) => {
    ControllerDecoratorsBuilder.addArgToMethod({
        target,
        _propertyKey,
        arg: {
            _parameterIndex,
            key: 'Locale',
        },
    })
}

