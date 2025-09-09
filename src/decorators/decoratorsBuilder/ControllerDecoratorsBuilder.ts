import {ArgControllerEndpoint} from '@controllers'
import {SwaggerBaseInfo} from '@swagger/core'


export class ControllerDecoratorsBuilder {
    static addArgToMethod({
                              target,
                              _propertyKey,
                              arg,
                          }: {
        target: any
        arg: ArgControllerEndpoint
        _propertyKey: string
    }) {
        if (!target.constructor.args) {
            target.constructor.args = {}
        }
        
        const allArgs: Record<string, ArgControllerEndpoint[]> = target.constructor.args
        if (!(_propertyKey in allArgs)) {
            allArgs[_propertyKey] = []
        }
        const args = allArgs[_propertyKey]
        args.unshift(arg)
    }
    
    
    static addImportStructureServiceToMethod({
                                                 target,
                                                 _propertyKey,
                                                 name,
                                                 key,
                                             }: {
        target: any,
        _propertyKey: string,
        name: string,
        key?: string,
    }) {
        if (!target.constructor.importStructureServiceEndpoints) {
            target.constructor.importStructureServiceEndpoints = {}
        }
        
        target.constructor.importStructureServiceEndpoints[_propertyKey] = {
            name,
            key,
        }
    }
    
    static setHeaderToMethod({
                                 target,
                                 _propertyKey,
                                 key,
                                 value,
                             }: {
        target: any,
        _propertyKey: string,
        key: string
        value: string
    }) {
        
        if (!target.constructor.headers) {
            target.constructor.headers = {}
        }
        
        const headersInfo = target.constructor.headers
        
        if (!headersInfo[_propertyKey]) {
            headersInfo[_propertyKey] = {}
        }
        
        headersInfo[_propertyKey][key] = value
    }
    
    static addSwaggerInfoToMethod({
                                      target,
                                      _propertyKey,
                                      baseInfo,
                                  }: {
        target: any,
        _propertyKey: string,
        baseInfo: SwaggerBaseInfo,
    }) {
        
        if (!target.constructor.swaggerInfo) {
            target.constructor.swaggerInfo = {}
        }
        const swaggerInfo = target.constructor.swaggerInfo
        
        swaggerInfo[_propertyKey] = baseInfo
        
    }
}