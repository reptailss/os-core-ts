import {ControllerDecoratorsBuilder, DecoratorParam} from '@decorators/core'
import {FullUserInfo} from '@auth'


export const DashboardAccessDec: DecoratorParam<FullUserInfo> = (
    target,
    _propertyKey,
    _parameterIndex,
) => {
    ControllerDecoratorsBuilder.addArgToMethod({
        target,
        _propertyKey,
        arg: {
            _parameterIndex,
            key: 'DashboardAccessDec',
        },
    })
}

