import {
    DefinitionsSwagger,
    DefinitionSwagger,
    ParameterSwagger,
    PathsSwagger,
    PropertySwagger,
    ResponseErrorDescriptionSwagger,
    ResponsesSwagger,
    SecuritySwagger,
    SwaggerTSHelper,
    SwaggerTsSchemas,
} from '@swagger/core'
import {ControllerSwaggerInfoRegistry} from '@swagger'
import {ArgControllerEndpoint} from '@controllers'
import {AppErrorHelper, AppErrorKey} from '@appError'
import {Definition} from 'typescript-json-schema'

export class SwaggerPathsBuilder {
    
    public getPathsByTSSchemas(tsSchema: SwaggerTsSchemas): PathsSwagger {
        const swaggerInfo = ControllerSwaggerInfoRegistry.getSwaggerInfoList()
        if (!swaggerInfo?.length) {
            return {}
        }
        
        const paths: PathsSwagger = {}
        swaggerInfo.forEach((item) => {
            if (!item.methods?.length) {
                return
            }
            item.methods.forEach((method) => {
                if (method?.baseInfo?.disable) {
                    return
                }
                const swaggerPathFormat = this.convertPathParams(method.path)
                if (!(swaggerPathFormat in paths)) {
                    paths[swaggerPathFormat] = {}
                }
                
                const endpoints = paths[swaggerPathFormat]
                const typeMethod = method.method
                const parameters = this.getParamsSwaggerByControllers({
                    tsSchema,
                    className: item.className,
                    method: typeMethod,
                    methodName: method.methodName,
                    args: method.args,
                })
                const tag = method.baseInfo?.tag || item.swaggerOptions?.tag || ''
                endpoints[typeMethod] = {
                    tags: [tag],
                    description: method?.baseInfo?.description,
                    summary: method?.baseInfo?.summary,
                    responses: this.getResponsesSwaggerByControllers({
                        tsSchema,
                        className: item.className,
                        method: typeMethod,
                        methodName: method.methodName,
                        args: method.args,
                        errorKeys: method.baseInfo?.errorKeys || [],
                    }),
                    parameters,
                    consumes: this.buildConsumesSwagger(parameters),
                    security: this.buildSecuritySwagger(this.buildSecurityTsBuildSchema(
                        method.args,
                        method.isSystemController,
                    )),
                }
                
                
            })
        })
        
        return paths
    }
    
    private convertPathParams(path: string): string {
        return path.replace(/:([\w]+)/g, '{$1}')
    }
    
    private getParamsSwaggerByControllers = ({
                                                 tsSchema,
                                                 className,
                                                 methodName,
                                                 method,
                                                 args,
                                             }: {
        tsSchema: SwaggerTsSchemas,
        className: string,
        methodName: string,
        method: 'get' | 'post' | 'put' | 'delete',
        args: ArgControllerEndpoint[]
    }): ParameterSwagger[] => {
        if (!args?.length) {
            return []
        }
        const params: ParameterSwagger[] = []
        args.forEach((arg, index) => {
            const paramsByArg = this.getParamsByArgSwaggerByControllers({
                tsSchema,
                className,
                methodName,
                method,
                arg,
                index,
            })
            if (paramsByArg.length >= 1) {
                params.push(...paramsByArg)
            }
        })
        
        return params
    }
    
    
    private getResponsesSwaggerByControllers({
                                                 tsSchema,
                                                 className,
                                                 methodName,
                                                 method,
                                                 errorKeys,
                                                 args,
                                             }: {
        tsSchema: SwaggerTsSchemas
        className: string
        methodName: string
        method: 'get' | 'post' | 'put' | 'delete'
        errorKeys: AppErrorKey[]
        args: ArgControllerEndpoint[]
    }): ResponsesSwagger {
        const responseKey = SwaggerTSHelper.getResponseKeyBuildTsSchema({
            method: methodName,
            className,
        })
        switch (method.toLocaleLowerCase()) {
            case 'put': {
                return this.buildMethodResponsesSwagger({
                    oldResponses: {
                        200: {
                            schema: tsSchema[responseKey] as any,
                        },
                    },
                    options: this.getOptionsFormArgsTsBuildSchema(args),
                    appErrorKeys: [
                        ...errorKeys,
                        'NOT_FOUND_ERROR',
                        'VALIDATION_ERROR',
                        'UPDATE_ROW_ERROR',
                        'GET_MODEL_ERROR',
                        'CONNECT_TO_DB_ERROR',
                        'SERVER_SIDE_ERROR',
                    ],
                })
            }
            case 'post': {
                return this.buildMethodResponsesSwagger({
                    oldResponses: {
                        200: {
                            schema: tsSchema[responseKey] as any,
                        },
                    },
                    options: this.getOptionsFormArgsTsBuildSchema(args),
                    appErrorKeys: [
                        ...errorKeys,
                        'VALIDATION_ERROR',
                        'CREATE_ROW_ERROR',
                        'GET_MODEL_ERROR',
                        'CONNECT_TO_DB_ERROR',
                        'SERVER_SIDE_ERROR',
                    ],
                })
            }
            case 'delete': {
                return this.buildMethodResponsesSwagger({
                    oldResponses: {
                        200: {
                            schema: tsSchema[responseKey] as any,
                        },
                    },
                    options: this.getOptionsFormArgsTsBuildSchema(args),
                    appErrorKeys: [
                        ...errorKeys,
                        'NOT_FOUND_ERROR',
                        'VALIDATION_ERROR',
                        'DELETE_ROW_ERROR',
                        'GET_MODEL_ERROR',
                        'CONNECT_TO_DB_ERROR',
                        'SERVER_SIDE_ERROR',
                    ],
                })
            }
            case 'get': {
                return this.buildMethodResponsesSwagger({
                    oldResponses: {
                        200: {
                            schema: tsSchema[responseKey] as any,
                        },
                    },
                    options: this.getOptionsFormArgsTsBuildSchema(args),
                    appErrorKeys: [
                        ...errorKeys,
                        'VALIDATION_ERROR',
                        'GET_MODEL_ERROR',
                        'CONNECT_TO_DB_ERROR',
                        'SERVER_SIDE_ERROR',
                    ],
                })
            }
            default : {
                return  {}
            }
        }
    }
    
    
    private buildMethodResponsesSwagger({
                                            options,
                                            oldResponses,
                                            appErrorKeys,
                                        }: {
        appErrorKeys: AppErrorKey[]
        oldResponses?: ResponsesSwagger,
        options?: {
            hasAuth?: boolean,
            hasDomainDb?: boolean,
            hasStructure?: boolean,
            haSaveFile?: boolean,
            errorKeys?: AppErrorKey[],
        }
    }): ResponsesSwagger {
        return {
            ...this.buildSwaggerResponsesByErrorKeys([
                ...this.getBaseErrorCodesSwagger(options),
                ...appErrorKeys,
            ]),
            ...oldResponses,
        }
    }
    
    private buildSwaggerResponsesByErrorKeys = (errorKeys: AppErrorKey[]): ResponsesSwagger => {
        const responses = errorKeys.map((errorKey) => this.buildResponseErrorDescription(errorKey))
        
        const map: Record<string, ResponseErrorDescriptionSwagger[]> = {}
        
        responses.forEach((response) => {
            const key = response.statusCode?.toString()
            if (!(key in map)) {
                map[key] = []
            }
            
            map[key].push(response)
        })
        
        const res: ResponsesSwagger = {}
        
        for (const statusCode in map) {
            const responses = map[statusCode]
            if (!responses?.length) {
                continue
            }
            res[statusCode] = {
                description: responses?.map(this.getResponsesSwaggerMessageFromResponseDescription)?.join(',\n----\n'),
            }
            
        }
        
        return res
    }
    
    private getResponsesSwaggerMessageFromResponseDescription(response: ResponseErrorDescriptionSwagger) {
        return `Error code: "${response.errorCode}"\n Message: ${response.message}`
    }
    
    private buildResponseErrorDescription(errorKey: AppErrorKey): ResponseErrorDescriptionSwagger {
        
        const {
            errorCode,
            statusCode,
        } = AppErrorHelper.getAppErrorCodeAndStatus({
            errorKey,
        })
        return {
            errorKey: errorKey,
            statusCode,
            errorCode,
            message: AppErrorHelper.getErrorMessageByErrorKey(errorKey),
        }
    }
    
    private getBaseErrorCodesSwagger = (options?: {
        hasAuth?: boolean,
        hasDomainDb?: boolean,
        hasStructure?: boolean,
        haSaveFile?: boolean,
        errorKeys?: AppErrorKey[],
    }): AppErrorKey[] => {
        const errorCodes: AppErrorKey[] = []
        if (options?.errorKeys && options.errorKeys.length >= 1) {
            errorCodes.push(...options.errorKeys)
        }
        
        if (options?.haSaveFile) {
            errorCodes.push('SAVE_FILE_ERROR')
        }
        
        
        if (options?.hasAuth) {
            errorCodes.unshift('INVALID_BEARER_TOKEN_ERROR')
            errorCodes.unshift('HEADER_VALIDATION_ERROR')
        }
        
        
        if (options?.hasDomainDb) {
            errorCodes.unshift('DOMAIN_ACCESS_DENIED_ERROR')
        }
        
        if (options?.hasStructure) {
            errorCodes.unshift('STRUCTURE_ACCESS_ERROR')
            errorCodes.unshift('INVALID_BEARER_TOKEN_ERROR')
            errorCodes.unshift('HEADER_VALIDATION_ERROR')
        }
        return [...new Set(errorCodes)]
    }
    
    private buildConsumesSwagger = (parameters?: ParameterSwagger[]): string[] => {
        const isFormData = parameters?.find((item) => item.in === 'formData' || item.name === 'formData')
        if (isFormData) {
            return ['multipart/form-data']
        }
        
        return ['application/json']
    }
    
    private buildSecuritySwagger = (security: (SecuritySwagger | object)[]): object[] => {
        
        if (!security?.length) {
            return []
        }
        const newSecurity: object[] = []
        
        security.forEach((item) => {
            if (typeof item === 'string') {
                if (item === 'auth' || item === 'structure') {
                    newSecurity.push({
                        'BearerAuth': [],
                    })
                }
                return
            }
            
            newSecurity.push(item)
        })
        
        
        return newSecurity
    }
    
    private buildSecurityTsBuildSchema = (args: ArgControllerEndpoint[], isSystemController?: boolean) => {
        const options = this.getOptionsFormArgsTsBuildSchema(args)
        const res: SecuritySwagger[] = []
        if (options.hasAuth || isSystemController) {
            res.push('auth')
        }
        if (options.hasStructure) {
            res.push('structure')
        }
        
        
        return res
    }
    
    
    private getParamsByArgSwaggerByControllers = ({
                                                      tsSchema,
                                                      className,
                                                      methodName,
                                                      method,
                                                      arg,
                                                      index,
                                                  }: {
        tsSchema: SwaggerTsSchemas
        className: string
        methodName: string
        method: 'get' | 'post' | 'put' | 'delete'
        arg: ArgControllerEndpoint
        index: number
    }): ParameterSwagger[] => {
        const paramsSchemas = this.getParamsByTsSchema({
            className,
            tsSchema,
            methodName,
        })
        const schema = paramsSchemas[index]
        switch (arg.key) {
            case 'Param':
                if (!schema) {
                    return []
                }
                return [
                    {
                        ...(schema as any),
                        in: 'path',
                        name: arg.fieldKey,
                        required: typeof arg.required !== 'undefined' ? arg.required : true,
                    },
                ]
            case 'ParamNum':
                if (!schema) {
                    return []
                }
                return [
                    {
                        ...(schema as any),
                        in: 'path',
                        name: arg.fieldKey,
                        required: typeof arg.required !== 'undefined' ? arg.required : true,
                    },
                ]
            case 'QueryParam':
                if (!schema) {
                    return []
                }
                return [
                    {
                        ...(schema as any),
                        in: 'query',
                        name: arg.fieldKey,
                        required: typeof arg.required !== 'undefined' ? arg.required : true,
                    },
                ]
            case 'QueryParamDate':
                if (!schema) {
                    return []
                }
                return [
                    {
                        ...(schema as any),
                        in: 'query',
                        name: arg.fieldKey,
                        required: typeof arg.required !== 'undefined' ? arg.required : true,
                    },
                ]
            case 'QueryParamNum':
                if (!schema) {
                    return []
                }
                return [
                    {
                        ...(schema as any),
                        in: 'query',
                        name: arg.fieldKey,
                        required: typeof arg.required !== 'undefined' ? arg.required : true,
                    },
                ]
            case 'Body':
                if (!schema) {
                    return []
                }
                return [{
                    in: 'body',
                    name: 'body',
                    schema,
                    required: true,
                }]
            case 'QueryParams':
                if (!schema) {
                    return []
                }
                return this.transformQueryParamsSwagger({
                    params: schema as ParameterSwagger,
                    type: 'query',
                    definitions: tsSchema as DefinitionsSwagger,
                })
            case 'Headers':
                if (!schema) {
                    return []
                }
                return this.transformQueryParamsSwagger({
                    params: schema as ParameterSwagger,
                    type: 'header',
                    definitions: tsSchema as DefinitionsSwagger,
                })
            case 'FormData':
                if (!schema) {
                    return []
                }
                return this.transformQueryParamsSwagger({
                    params: schema as ParameterSwagger,
                    type: 'formData',
                    definitions: tsSchema as DefinitionsSwagger,
                })
            case 'AppFile':
                if (!schema) {
                    return []
                }
                return [
                    {
                        in: 'formData',
                        type: 'file',
                        required: arg.required,
                        name: arg.fileKey,
                    },
                ]
            case 'AppFiles':
                if (!schema) {
                    return []
                }
                return [
                    {
                        in: 'formData',
                        type: 'array',
                        items: {
                            type: 'file',
                        },
                        name: arg.fileKey,
                    },
                ]
            case 'PaginationQueryParams':
                if (!schema) {
                    return []
                }
                if (arg.in === 'body') {
                    return [{
                        in: 'body',
                        name: 'body',
                        schema,
                        required: true,
                    }]
                }
                return this.transformQueryParamsSwagger({
                    params: schema as ParameterSwagger,
                    type: 'query',
                    definitions: tsSchema as DefinitionsSwagger,
                })
            
            case 'Header':
                if (!schema) {
                    return []
                }
                return [
                    {
                        ...(schema as any),
                        in: 'header',
                        name: arg.fieldKey,
                        required: typeof arg.required !== 'undefined' ? arg.required : true,
                    },
                ]
            case 'Domain':
                return [
                    {
                        in: 'header',
                        name: 'domain',
                        required: true,
                        type: 'string',
                        description: 'Site domain — the domain name of the client site making the request (e.g., https://example.com)',
                    },
                ]
            default :
                return []
        }
        
    }
    
    private transformQueryParamsSwagger({
                                            params,
                                            definitions,
                                            type,
                                        }: {
        params: ParameterSwagger,
        definitions: DefinitionsSwagger,
        type: 'query' | 'formData' | 'header'
    }): ParameterSwagger[] {
        
        const res: ParameterSwagger[] = []
        
        if (params?.anyOf && params.anyOf.length >= 1) {
            const newParams = this.getParams({
                definition: params.anyOf[0],
                definitions,
                type,
            })
            if (newParams?.length) {
                res.push(...newParams)
            }
        }
        
        if (params.type === 'object' && params.properties) {
            const newParams = this.getParams({
                definition: params,
                definitions,
                type,
            })
            if (newParams?.length) {
                res.push(...newParams)
            }
        }
        const refPath = this.getRefPathSwagger(params?.schema?.$ref || params?.$ref || '')
        const ref = this.getRefFromPathSwagger(refPath)
        if (!(ref in definitions)) {
            return res
            
        }
        const definition: DefinitionSwagger = definitions[ref]
        
        if ('anyOf' in definition && definition.anyOf && definition.anyOf.length >= 1) {
            const newParams = this.getParams({
                definition: definition.anyOf[0],
                definitions,
                type,
            })
            if (newParams?.length) {
                res.push(...newParams)
            }
        }
        
        if (definition.allOf && definition.allOf?.length >= 1) {
            definition.allOf.forEach((item) => {
                const childParams = this.getParams({
                    definition: item,
                    definitions,
                    type,
                })
                if (childParams?.length) {
                    res.push(...childParams)
                }
            })
        }
        
        if (definition.type === 'object' && definition?.properties) {
            const newParams = this.getParams({
                definition,
                definitions,
                type,
            })
            if (newParams?.length) {
                res.push(...newParams)
            }
        }
        
        return res
    }
    
    
    private getKeyParam(key: string, parentKey?: string) {
        if (!parentKey) {
            return key
        }
        
        return `${parentKey}[${key}]`
    }
    
    private getParams({
                          definition,
                          definitions,
                          parentKey,
                          type,
                      }: {
        definition: DefinitionSwagger | PropertySwagger | ParameterSwagger,
        definitions: DefinitionsSwagger,
        parentKey?: string,
        type: 'query' | 'formData' | 'header'
    }) {
        const res: ParameterSwagger[] = []
        if ((definition.type === 'string' || definition.type === 'number') && parentKey) {
            res.push({
                name: this.getKeyParam(parentKey),
                type: definition.type,
                enum: definition?.enum,
                in: type,
                required: typeof definition?.required === 'boolean' ? definition?.required : parentKey && Array.isArray(definition?.required) ? definition?.required?.includes(parentKey) : false,
            })
        }
        
        if ('allOf' in definition && definition?.allOf && definition?.allOf?.length >= 1) {
            definition.allOf.forEach((definitionChild) => {
                const newParams = this.getParams({
                    definition: definitionChild,
                    definitions,
                    parentKey,
                    type,
                })
                if (newParams?.length) {
                    res.push(...newParams)
                }
            })
        }
        
        if (definition?.$ref) {
            const refPath = this.getRefPathSwagger(definition?.$ref || '')
            const ref = this.getRefFromPathSwagger(refPath)
            const childDefinition = definitions[ref]
            const newParams = this.getParams({
                definition: childDefinition,
                definitions,
                parentKey,
                type,
            })
            if (newParams?.length) {
                res.push(...newParams)
            }
        }
        
        if (definition?.properties) {
            for (const key in definition.properties) {
                const property = definition.properties[key]
                if (property.$ref) {
                    const refPath = this.getRefPathSwagger(property?.$ref || '')
                    const ref = this.getRefFromPathSwagger(refPath)
                    if (ref in definitions) {
                        const childDefinition = definitions[ref]
                        const newParams = this.getParams({
                            definition: childDefinition,
                            definitions,
                            parentKey: this.getKeyParam(key, parentKey),
                            type,
                        })
                        if (newParams?.length) {
                            res.push(...newParams)
                        }
                    }
                    continue
                    
                }
                
                if (property.type === 'object' && property.properties) {
                    const newParams = this.getParams({
                        definition: property,
                        definitions,
                        parentKey: this.getKeyParam(key, parentKey),
                        type,
                    })
                    if (newParams?.length >= 1) {
                        res.push(...newParams)
                    }
                    continue
                }
                
                if (property.type && property.type !== 'object') {
                    
                    res.push({
                        name: this.getKeyParam(key, parentKey),
                        type: property.type,
                        enum: property?.enum,
                        in: type,
                        required: typeof definition?.required === 'boolean' ? definition?.required : Array.isArray(definition?.required) ? definition?.required?.includes(key) : false,
                        items: property?.items,
                    })
                }
            }
        }
        
        return res
    }
    
    private getRefPathSwagger(refPath: string): string {
        if (!refPath.includes('/definitions/')) {
            return `#/definitions/${refPath.slice(1)}`
        }
        return refPath
    }
    
    private getRefPathKeySwagger(refPath: string): string {
        if (!refPath.includes('/definitions')) {
            return `#/definitions/${refPath}`
        }
        return refPath
    }
    
    private getRefFromPathSwagger(refPath: string): string {
        return refPath?.slice(14)
    }
    
    private getParamsByTsSchema = ({
                                       tsSchema,
                                       className,
                                       methodName,
                                   }: {
        tsSchema: SwaggerTsSchemas,
        className: string,
        methodName: string,
    }): Definition[] => {
        const paramKey = SwaggerTSHelper.getParamsKeyBuildTsSchema({
            method: methodName,
            className,
        })
        
        const res = tsSchema[paramKey]
        if (!res || !Array.isArray(res)) {
            return []
        }
        return res
    }
    
    
    private getOptionsFormArgsTsBuildSchema(args: ArgControllerEndpoint[]): {
        hasAuth: boolean,
        hasDomainDb: boolean,
        hasStructure: boolean,
        haSaveFile: boolean,
    } {
        let hasAuth = false
        let hasDomainDb = false
        let hasStructure = false
        let haSaveFile = false
        
        if (args?.length >= 1) {
            args.forEach((arg) => {
                switch (arg.key) {
                    case 'AppFiles': {
                        haSaveFile = true
                        break
                    }
                    case 'Auth': {
                        hasAuth = true
                        break
                    }
                    case 'PtpClientAuth': {
                        hasAuth = true
                        break
                    }
                    case 'PtpCoreAuth': {
                        hasAuth = true
                        break
                    }
                    case 'SystemAuth': {
                        hasAuth = true
                        break
                    }
                    case 'Domain': {
                        hasDomainDb = true
                        break
                    }
                    case 'DashboardAccessDec': {
                        hasAuth = true
                        break
                    }
                }
            })
        }
        
        return {
            hasAuth,
            hasDomainDb,
            hasStructure,
            haSaveFile,
        }
    }
    
}