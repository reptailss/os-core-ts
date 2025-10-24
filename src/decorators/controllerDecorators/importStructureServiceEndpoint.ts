import {ControllerDecoratorsBuilder, DecoratorMethod} from '@decorators/core'


export function ImportStructureServiceEndpoint(name: string, {key}: {
    key?: string
} = {}): DecoratorMethod {
    return function(
        target,
        _propertyKey,
        descriptor,
    ) {

        ControllerDecoratorsBuilder.addImportStructureServiceToMethod({
            target,
            key,
            name,
            _propertyKey,
        })

    }
}



