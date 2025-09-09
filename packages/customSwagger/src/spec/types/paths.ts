import { ResponsesSwagger } from "./response"



export interface OperationSwagger {
    summary?: string,
    consumes?: string[],
    tags?: string[],
    description?: string,
    parameters?: ParameterSwagger[],
    responses?: ResponsesSwagger,
    security?: (SecuritySwagger| object) []
}


export type ParameterSwagger = {
    in?: string,
    name?: string,
    type?: ParameterTypeSwagger,
    enum?: any[],
    default?: any,
    required?: boolean,
    items?: ParameterSwagger | PropertySwagger,
    $ref?: string,
    schema?: {
        $ref?: string
    },
    properties?:PropertiesParameterSwagger,
    allOf?:ParameterSwagger[],
    anyOf?:ParameterSwagger[],
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
