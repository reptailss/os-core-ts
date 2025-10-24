import {ControllerDecoratorsBuilder, DecoratorParam} from '@decorators/core'
import {FullUserDto} from '@auth'


export const DashboardUser = (): DecoratorParam<FullUserDto> => {
    return (target, _propertyKey, _parameterIndex) => {
        ControllerDecoratorsBuilder.addArgToMethod({
            target,
            _propertyKey,
            arg: {
                _parameterIndex,
                key: 'DashboardUser',
            },
        })
    }
}