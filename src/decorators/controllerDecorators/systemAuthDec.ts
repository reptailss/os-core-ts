import {UserInfo} from '@auth'
import {ControllerDecoratorsBuilder, DecoratorParam} from '@decorators/core'


export const SystemAuthDec: DecoratorParam<UserInfo> = (
    target: any,
    _propertyKey,
    _parameterIndex,
) => {

    ControllerDecoratorsBuilder.addArgToMethod({
        target,
        _propertyKey,
        arg: {
            key: 'SystemAuth',
            _parameterIndex,
        },
    })
}
