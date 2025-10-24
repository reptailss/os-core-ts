import {ControllerDecoratorsBuilder, DecoratorParam} from '@decorators/core'
import {PtpClientUserDto, PtpCoreUserDto} from '@auth'

export const PtpClientUser = (
    roles?: Array<'admin'>,
): DecoratorParam<PtpClientUserDto> => {

    return function(
        target,
        _propertyKey,
        _parameterIndex) {

        ControllerDecoratorsBuilder.addArgToMethod({
            target,
            _propertyKey,
            arg: {
                _parameterIndex,
                roles,
                key: 'PtpClientUser',
            },
        })
    }

}

export const PtpCoreUser = (
    roles?: Array<'admin'>,
): DecoratorParam<PtpCoreUserDto> => {

    return function(
        target,
        _propertyKey,
        _parameterIndex) {

        ControllerDecoratorsBuilder.addArgToMethod({
            target,
            _propertyKey,
            arg: {
                _parameterIndex,
                roles,
                key: 'PtpCoreUser',
            },
        })
    }

}