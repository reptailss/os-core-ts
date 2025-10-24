import {ControllerDecoratorsBuilder, DecoratorMethod, DecoratorParam} from '@decorators/core'
import {ControllerEndpoint} from '@controllers'

export function Header(key: string, value: string): DecoratorMethod {
    return function(
        target,
        _propertyKey,
        descriptor,
    ) {
        const endpoints: ControllerEndpoint[] = target.constructor.endpoints || []
        const endpoint = endpoints.find((endpoint) => endpoint._propertyKey === _propertyKey)
        if (!endpoint) {
            return
        }
        
        ControllerDecoratorsBuilder.setHeaderToMethod({
            target,
            _propertyKey,
            key,
            value,
        })
    }
}

export const HeaderSetter = (): DecoratorParam<
    (name: string, value: number | string | readonly string[]) => void
> => {
    return (target, _propertyKey, _parameterIndex) => {
        ControllerDecoratorsBuilder.addArgToMethod({
            target,
            _propertyKey,
            arg: {
                key: 'SetHeaderFn',
                _parameterIndex,
            },
        })
    }
}


