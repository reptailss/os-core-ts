import {AppErrorKey} from '@appError'
import {ArgControllerEndpoint} from '@controllers'


export type Swagger = {
    swagger: string
    info: {
        title: string
        description: string
        version: string
    }
    host: string
    basePath?: string
    schemes: string[]
    paths: PathsSwagger,
    definitions: DefinitionsSwagger
    externalDocs?: {
        url?: string
    },
    defaultAuthToken?: string

}

export type DefinitionsSwagger = Record<string, DefinitionSwagger>

export type DefinitionSwagger = {
    properties: PropertiesSwagger
    type?: PropertyTypeSwagger
    allOf?: DefinitionSwagger[]
    anyOf?: DefinitionSwagger[]
    items?: DefinitionSwagger
    $ref?: string
    required?: string[]
    enum?: any[],
    schema?: DefinitionSwagger
}


export interface OperationSwagger {
    summary?: string
    consumes?: string[]
    tags?: string[]
    description?: string
    errorKeys?: AppErrorKey[]
    parameters?: ParameterSwagger[]
    responses?: ResponsesSwagger
    security?: (SecuritySwagger | object) []
}

export type ParameterSwagger = {
    in?: string
    name?: string
    type?: ParameterTypeSwagger
    enum?: any[]
    default?: any
    required?: boolean
    items?: ParameterSwagger | PropertySwagger
    $ref?: string
    schema?: {
        $ref?: string
    },
    properties?: PropertiesParameterSwagger
    allOf?: ParameterSwagger[]
    anyOf?: ParameterSwagger[]
    description?: string
}

export type PropertiesParameterSwagger = Record<string, ParameterSwagger>

export type ParameterTypeSwagger = 'object' | 'number' | 'string' | 'file' | 'array'
export type SecuritySwagger = 'auth' | 'domainDb' | 'structure'

export type OperationsSwagger = {
    post?: OperationSwagger,
    put?: OperationSwagger,
    delete?: OperationSwagger,
    get?: OperationSwagger,
}

export type PathsSwagger = Record<string, OperationsSwagger>


export type PropertiesSwagger = Record<string, PropertySwagger>
export type PropertySwagger = {
    type: PropertyTypeSwagger
    format?: 'date-time'
    enum?: any[],
    $ref?: string,
    items?: PropertySwagger,
    properties?: PropertiesSwagger,
    required?: string[]
}

export type PropertyTypeSwagger = 'object' | 'number' | 'string' | 'array'


export type ResponseErrorDescriptionSwagger = {
    errorKey: string,
    errorCode: string,
    statusCode: number,
    message: string,
}


export type ResponsesSwagger = Record<string, ResponseSwagger>


export type ResponseSwagger = {
    description?: string
    schema?: {
        $ref?: string
        type?: 'object'
        properties?: ResponsesSwagger
        items?: ResponseSwagger
    },
    $ref?: string
    type?: 'object'
    properties?: ResponsesSwagger
    items?: ResponseSwagger
    allOf?: ResponseSwagger[]
    anyOf?: ResponseSwagger[]
}


export type ControllerSwaggerInfo = {
    methods: ControllersMethodSwaggerInfo[],
    className: string,
    swaggerOptions?: {
        tag?: string
    },
}

export type ControllersMethodSwaggerInfo = {
    method: 'get' | 'post' | 'put' | 'delete',
    methodName: string,
    path: string,
    args: ArgControllerEndpoint[],
    baseInfo?: SwaggerBaseInfo,
    isSystemController?: boolean
    swaggerOptions?:{
        tag?:string
    }
}


export type SwaggerBaseInfo = {
    summary?: string
    description?: string
    errorKeys?: AppErrorKey[]
    tag?: string
    disable?: boolean
}
