import {UserDto} from '@auth'
import {ControllerDecoratorsBuilder, DecoratorParam} from '@decorators/core'


export const SystemUser = (): DecoratorParam<UserDto> => {
    return (target, _propertyKey, _parameterIndex) => {
        ControllerDecoratorsBuilder.addArgToMethod({
            target,
            _propertyKey,
            arg: {
                _parameterIndex,
                key: 'SystemUser',
            },
        })
    }
}