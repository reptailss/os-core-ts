import {ControllerDecoratorsBuilder, DecoratorParam} from '@decorators/core'
import {AppResponse} from '@appResponse'


export const Res = (): DecoratorParam<
    AppResponse
> => {
    return function(
        target,
        _propertyKey,
        _parameterIndex) {
        ControllerDecoratorsBuilder.addArgToMethod({
            target,
            _propertyKey,
            arg: {
                key: 'AppResponse',
                _parameterIndex,
            },
        })
    }
}


