import {ControllerDecoratorsBuilder, DecoratorParam} from '@decorators/core'
import {AppResponse} from '@appResponse'


export const AppResponseDec: DecoratorParam<AppResponse> = (
    target,
    _propertyKey,
    _parameterIndex,
) => {

    ControllerDecoratorsBuilder.addArgToMethod({
        target,
        _propertyKey,
        arg: {
            key: 'AppResponse',
            _parameterIndex,
        },
    })
}
