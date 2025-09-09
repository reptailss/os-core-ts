import {ControllerDecoratorsBuilder, DecoratorParam} from '@decorators/core'

export const SetResponseStatusDec: DecoratorParam<(status:number)=>void> = (
    target,
    _propertyKey,
    _parameterIndex,
) => {
    ControllerDecoratorsBuilder.addArgToMethod({
        target,
        _propertyKey,
        arg: {
            _parameterIndex,
            key: 'SetResponseStatus',
        },
    })
}

