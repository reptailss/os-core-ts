import {ControllerDecoratorsBuilder, DecoratorParam} from '@decorators/core'
import {UserDto} from '@auth'



export const User = (): DecoratorParam<UserDto> => {
    return (target, _propertyKey, _parameterIndex) => {
        ControllerDecoratorsBuilder.addArgToMethod({
            target,
            _propertyKey,
            arg: {
                key: 'User',
                _parameterIndex,
            },
        })
    }
}