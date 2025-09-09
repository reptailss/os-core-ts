import {ControllerDecoratorsBuilder, DecoratorParam} from '@decorators/core'
import {UserInfo} from '@auth'


export const AuthDec: DecoratorParam<UserInfo> = (
    target,
    _propertyKey,
    _parameterIndex,
) => {
    ControllerDecoratorsBuilder.addArgToMethod({
        target,
        _propertyKey,
        arg: {
            key: 'Auth',
            _parameterIndex,
        },
    })
}
