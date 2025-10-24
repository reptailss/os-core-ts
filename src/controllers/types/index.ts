import {ArgControllerEndpoint} from '@controllers'
import {SwaggerBaseInfo} from '@swagger/core'


export type ControllerMeta = {
    endpoints: (
        ControllerEndpoint |
        SystemControllerEndpoint |
        SendFileControllerEndpoint
        )[]
    swaggerOptions?: ControllerSwaggerOptions
    importStructureServiceEndpoints?: Record<string, {name: string, key?: string}>
    args: Record<string, ArgControllerEndpoint[]>
    name: string
    swaggerInfo: Record<string, SwaggerBaseInfo>
    type: 'default'
    headers: Record<string, Record<string, string>>
}

export type ControllerEndpoint = {
    method: 'GET' | 'POST' | 'PUT' | 'DELETE'
    path: string
    _propertyKey: string
    type: 'default'
}

export type SendFileControllerEndpoint = Omit<ControllerEndpoint, 'type' | 'method'> & {
    method: 'GET'
    type: 'sendFileByPath' | 'sendFile'
    options?: {
        root?: string
    }
}

export type SystemControllerEndpoint = Omit<ControllerEndpoint, 'type'> & {
    type: 'system'
}

export type ControllerSwaggerOptions = {
    tag?: string
}



