import {ControllerDecoratorsBuilder, DecoratorParam} from '@decorators/core'
import {PtpClientUserInfo, PtpCoreUserInfo} from '@auth'

export const PtpClientAuthDec = (
    roles?: Array<'admin'>,
): DecoratorParam<PtpClientUserInfo> => {

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
                key: 'PtpClientAuth',
            },
        })
    }

}

export const PtpCoreAuthDec = (
    roles?: Array<'admin'>,
): DecoratorParam<PtpCoreUserInfo> => {

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
                key: 'PtpCoreAuth',
            },
        })
    }

}