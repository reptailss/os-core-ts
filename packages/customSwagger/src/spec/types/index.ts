import { PathsSwagger, PropertiesSwagger, PropertyTypeSwagger } from "./paths"


export interface SpecSwagger {
    swagger: string
    info: {
        title: string,
        description: string
        version: string
    }
    host: string
    basePath?: string
    schemes: string[]
    paths: PathsSwagger,
    definitions: DefinitionsSwagger,
    externalDocs?: {
        url?: string
    },
    defaultAuthToken?:string

}

export type DefinitionsSwagger = Record<string, DefinitionSwagger>

export type DefinitionSwagger = {
    properties?: PropertiesSwagger
    type?: PropertyTypeSwagger
    oneOf?: DefinitionSwagger[],
    anyOf?: DefinitionSwagger[],
    allOf?: DefinitionSwagger[],
    items?: DefinitionSwagger,
    $ref?: string,
    required?: string[]
    defaultProperties?: string[]
    enum?: any[],
    schema?:DefinitionSwagger
}


