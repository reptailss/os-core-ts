import {SchemaValidator, SchemaValidatorRefineEffect} from '@validator'
import {PaginationQueryParams} from '@pagination'
import {AppRequest} from '@appRequest'
import {AppResponse} from '@appResponse'


export type  ArgControllerEndpoint =
    QueryParamsArgControllerEndpoint |
    BodyArgControllerEndpoint |
    FormDataArgControllerEndpoint |
    ParamsArgControllerEndpoint |
    AuthArgControllerEndpoint |
    PtpClientAuthArgControllerEndpoint |
    PtpCoreAuthArgControllerEndpoint |
    PaginationQueryParamsArgControllerEndpoint |
    DomainArgControllerEndpoint |
    AppResponseArgControllerEndpoint |
    AppFileArgControllerEndpoint |
    AppFilesArgControllerEndpoint |
    QueryParamArgControllerEndpoint |
    ParamNumArgControllerEndpoint |
    QueryParamNumArgControllerEndpoint |
    QueryParamDateArgControllerEndpoint |
    SystemAuthArgControllerEndpoint |
    LegalEntityIdByDomainArgControllerEndpoint |
    RedirectArgControllerEndpoint |
    ParamArgControllerEndpoint |
    HeadersArgControllerEndpoint |
    DeleteOldFileIfNullDecArgControllerEndpoint |
    DashboardAccessDecArgControllerEndpoint |
    HeaderArgControllerEndpoint |
    LocaleArgControllerEndpoint |
    SetResponseStatusArgControllerEndpoint |
    CustomArgControllerEndpoint<any>


interface HeadersArgControllerEndpoint {
    key: 'Headers'
    _parameterIndex: number
    schema?: SchemaValidator | SchemaValidatorRefineEffect
}

export interface HeaderArgControllerEndpoint {
    key: 'Header'
    fieldKey: string
    _parameterIndex: number
    schema?: SchemaValidator | SchemaValidatorRefineEffect
    required: boolean
}

interface RedirectArgControllerEndpoint {
    key: 'Redirect'
    _parameterIndex: number
}


interface AppResponseArgControllerEndpoint {
    key: 'AppResponse'
    _parameterIndex: number
}


interface DeleteOldFileIfNullDecArgControllerEndpoint {
    key: 'DeleteOldFileIfNull'
    _parameterIndex: number
    fileKey?: string
}

export interface QueryParamsArgControllerEndpoint {
    key: 'QueryParams'
    _parameterIndex: number
    schema: SchemaValidator | SchemaValidatorRefineEffect
}

export interface QueryParamArgControllerEndpoint {
    key: 'QueryParam'
    _parameterIndex: number
    schema?: SchemaValidator<string | number | Date | undefined | string[] | number[]> | SchemaValidatorRefineEffect<string | number | Date | undefined | string[] | number[]>
    fieldKey: string,
    required?: boolean
}

export interface QueryParamNumArgControllerEndpoint {
    key: 'QueryParamNum'
    _parameterIndex: number
    schema?: SchemaValidator<number | undefined> | SchemaValidatorRefineEffect<number | undefined>
    fieldKey: string,
    required?: boolean
}

export interface QueryParamDateArgControllerEndpoint {
    key: 'QueryParamDate'
    _parameterIndex: number
    schema?: SchemaValidator<Date | undefined> | SchemaValidatorRefineEffect<Date | undefined>
    fieldKey: string,
    required?: boolean
}

export interface BodyArgControllerEndpoint {
    key: 'Body'
    _parameterIndex: number,
    schema: SchemaValidator | SchemaValidatorRefineEffect,
}

interface ParamsArgControllerEndpoint {
    key: 'Params'
    _parameterIndex: number
    schema: SchemaValidator | SchemaValidatorRefineEffect,
    
}

export interface ParamArgControllerEndpoint {
    key: 'Param'
    _parameterIndex: number
    schema?: SchemaValidator<string | number | Date | undefined> | SchemaValidatorRefineEffect<string | number | Date | undefined>
    fieldKey: string,
    required?: boolean
}

export interface ParamNumArgControllerEndpoint {
    key: 'ParamNum'
    _parameterIndex: number
    schema?: SchemaValidator<number | undefined> | SchemaValidatorRefineEffect<number | undefined>
    fieldKey: string,
    required?: boolean
}

export interface FormDataArgControllerEndpoint {
    key: 'FormData'
    _parameterIndex: number
    schema: SchemaValidator | SchemaValidatorRefineEffect
}

export interface AppFileArgControllerEndpoint {
    key: 'AppFile'
    _parameterIndex: number
    fileKey?: string
    formats?: string[]
    required?: boolean
}

export interface AppFilesArgControllerEndpoint {
    key: 'AppFiles'
    _parameterIndex: number
    fileKey?: string
    maxCount?: number
    minCount?: number
    formats?: string[]
}

interface AuthArgControllerEndpoint {
    key: 'Auth'
    _parameterIndex: number
}

interface PtpClientAuthArgControllerEndpoint {
    key: 'PtpClientAuth'
    roles?: Array<'admin'>
    _parameterIndex: number
}


interface PtpCoreAuthArgControllerEndpoint {
    key: 'PtpCoreAuth'
    roles?: Array<'admin'>
    _parameterIndex: number
}

interface SystemAuthArgControllerEndpoint {
    key: 'SystemAuth'
    _parameterIndex: number
}


export interface DomainArgControllerEndpoint {
    key: 'Domain'
    _parameterIndex: number
}

export interface LocaleArgControllerEndpoint {
    key: 'Locale'
    _parameterIndex: number
}

export interface SetResponseStatusArgControllerEndpoint {
    key: 'SetResponseStatus'
    _parameterIndex: number
}

export interface CustomArgControllerEndpoint<Output> {
    key: 'CustomArg'
    getValueCb: (req: AppRequest, res: AppResponse) => Promise<Output>
    _parameterIndex: number
}


interface LegalEntityIdByDomainArgControllerEndpoint {
    key: 'LegalEntityIdByDomain'
    _parameterIndex: number
}

export interface PaginationQueryParamsArgControllerEndpoint<Row extends object = any> {
    key: 'PaginationQueryParams'
    _parameterIndex: number
    schema: SchemaValidator<PaginationQueryParams<Row>>
    in: 'query' | 'body'
}


interface DashboardAccessDecArgControllerEndpoint {
    key: 'DashboardAccessDec'
    _parameterIndex: number
}
