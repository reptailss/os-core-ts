import {ControllerDecoratorsBuilder, DecoratorParam} from '@decorators/core'

export const AppLocale = (): DecoratorParam<string | null> => {
    return (target, _propertyKey, _parameterIndex) => {
        ControllerDecoratorsBuilder.addArgToMethod({
            target,
            _propertyKey,
            arg: {
                _parameterIndex,
                key: 'Locale',
            },
        })
    }
}


