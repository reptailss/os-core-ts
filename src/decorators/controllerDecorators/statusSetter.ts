import {ControllerDecoratorsBuilder, DecoratorParam} from '@decorators/core'


export const StatusSetter = (): DecoratorParam<(status: number) => void> => {
    return (target, _propertyKey, _parameterIndex) => {
        ControllerDecoratorsBuilder.addArgToMethod({
            target,
            _propertyKey,
            arg: {
                key: 'SetResponseStatus',
                _parameterIndex,
            },
        })
    }
}