import {APP_CONFIG_OS_CORE} from '@appConfig'
import {ControllerDecoratorsBuilder, DecoratorMethod} from '@decorators/core'
import {SwaggerBaseInfo} from '@swagger/core'


export function SwaggerInfo(baseInfo: SwaggerBaseInfo): DecoratorMethod {
    return function(
        target,
        _propertyKey,
        descriptor,
    ) {
        if (!APP_CONFIG_OS_CORE.swagger.hasSwagger) {
            return
        }

        ControllerDecoratorsBuilder.addSwaggerInfoToMethod({
            target,
            _propertyKey,
            baseInfo,
        })
    }
}



