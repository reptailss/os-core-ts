import {ControllerDecoratorsBuilder, DecoratorParam} from '@decorators/core'




export function Domain(): DecoratorParam<string> {
    return (target, _propertyKey, _parameterIndex) => {
        ControllerDecoratorsBuilder.addArgToMethod({
            target,
            _propertyKey,
            arg: {
                _parameterIndex,
                key: 'Domain',
            },
        })
    }
}