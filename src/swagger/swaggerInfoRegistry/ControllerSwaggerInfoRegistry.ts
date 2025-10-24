import {ControllersMethodSwaggerInfo, ControllerSwaggerInfo} from '@swagger/core'
import {ControllerMeta, ControllersHelper} from '@controllers'


const swaggerInfo: ControllerSwaggerInfo[] = []

export class ControllerSwaggerInfoRegistry {
    
    static addFromControllers({
                                  controllers,
                                  baseSwaggerTag,
                              }: {
        controllers: ControllerMeta[]
        baseSwaggerTag?: string
    }): void {
        controllers.forEach(controller => {
            this.add({
                controller,
                baseSwaggerTag,
            })
        })
    }
    
    static add({
                   controller,
                   baseSwaggerTag,
               }: {
        controller: ControllerMeta
        baseSwaggerTag?: string,
    }): void {
        if (!controller.endpoints?.length) {
            return
        }
        const methods: ControllersMethodSwaggerInfo[] = []
        controller.endpoints.forEach((endpoint) => {
            const method = endpoint.method.toLowerCase()
            
            if (
                method !== 'get' &&
                method !== 'post' &&
                method !== 'put' &&
                method !== 'delete'
            ) {
                return
            }
            methods.push({
                method: method as 'get' | 'post' | 'put' | 'delete',
                methodName: endpoint._propertyKey,
                path: ControllersHelper.buildEndpointUrl({
                    endpointPath: endpoint.path,
                    isSystemEndpoint: endpoint.type === 'system',
                }),
                args: controller.args[endpoint._propertyKey] || [],
                swaggerOptions: {
                    ...(controller?.swaggerOptions || {}),
                    tag: baseSwaggerTag || controller?.swaggerOptions?.tag,
                },
                baseInfo: {
                    tag: baseSwaggerTag || controller.swaggerInfo[endpoint._propertyKey]?.tag,
                    ...(controller.swaggerInfo[endpoint._propertyKey] || {}),
                },
                isSystemController: endpoint.type === 'system',
            })
        })
        swaggerInfo.push({
            methods,
            className: controller.constructor.name,
        })
    }
    
    static getSwaggerInfoList() {
        return swaggerInfo
    }
}