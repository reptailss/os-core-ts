import {ControllerDecoratorsBuilder, DecoratorMethod} from '@decorators/core'
import {ControllerEndpoint} from '@controllers'

export function SetHeaderDec(key: string, value: string): DecoratorMethod {
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



