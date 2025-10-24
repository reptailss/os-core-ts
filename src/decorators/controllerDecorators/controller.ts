import 'reflect-metadata'
import {DiContainer} from '@di'


export function Controller(): ClassDecorator {
    return function(constructor: any) {
        constructor.prototype.endpoints = [...(constructor.endpoints || [])]
        constructor.prototype.args = {...(constructor.args || {})}
        constructor.prototype.swaggerInfo = {...(constructor.swaggerInfo || {})}
        constructor.prototype.headers = {...(constructor.headers || {})}
        constructor.prototype.importStructureServiceEndpoints = {...(constructor.importStructureServiceEndpoints || {})}
        constructor.prototype.type = 'default'
        
        
        DiContainer.register(constructor, {lifetime: 'singleton'})
    }
}