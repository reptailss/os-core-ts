import {SchemaValidator, SchemaValidatorRefineEffect} from '@validator'
import {PaginationQueryParams} from '@pagination'
import {AppRequest} from '@appRequest'
import {AppResponse} from '@appResponse'


export type  ArgControllerEndpoint =
    QueryParamsArgControllerEndpoint |
    BodyArgControllerEndpoint |
    FormDataArgControllerEndpoint |
    UserArgControllerEndpoint |
    PtpClientUserArgControllerEndpoint |
    PtpCoreUserArgControllerEndpoint |
    PaginationQueryParamsArgControllerEndpoint |
    DomainArgControllerEndpoint |
    AppResponseArgControllerEndpoint |
    AppFileArgControllerEndpoint |
    AppFilesArgControllerEndpoint |
    QueryParamArgControllerEndpoint |
    ParamNumArgControllerEndpoint |
    QueryParamNumArgControllerEndpoint |
    QueryParamDateArgControllerEndpoint |
    SystemUserArgControllerEndpoint |
    LegalEntityIdByDomainArgControllerEndpoint |
    ParamArgControllerEndpoint |
    DeleteOldFileIfNullArgControllerEndpoint |
    DashboardUserDecArgControllerEndpoint |
    HeaderParamArgControllerEndpoint |
    LocaleArgControllerEndpoint |
    SetResponseStatusArgControllerEndpoint |
    CustomArgControllerEndpoint<any> |
    SetHeaderFnDecArgControllerEndpoint |
    BodyParamArgControllerEndpoint |
    BodyParamNumArgControllerEndpoint |
    AppFormDataParamArgControllerEndpoint |
    AppFormDataParamNumArgControllerEndpoint



export interface HeaderParamArgControllerEndpoint {
    key: 'HeaderParam'
    fieldKey: string
    _parameterIndex: number
    schema?: SchemaValidator | SchemaValidatorRefineEffect
    required: boolean
}


export interface AppResponseArgControllerEndpoint {
    key: 'AppResponse'
    _parameterIndex: number
}


export interface DeleteOldFileIfNullArgControllerEndpoint {
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


export interface ParamArgControllerEndpoint {
    key: 'Param'
    _parameterIndex: number
    schema?: SchemaValidator<string | number | Date | undefined> | SchemaValidatorRefineEffect<string | number | Date | undefined>
    fieldKey: string,
    required?: boolean
}

export interface BodyParamArgControllerEndpoint {
    key: 'BodyParam'
    _parameterIndex: number
    schema?: SchemaValidator<string | number | Date | undefined | unknown> | SchemaValidatorRefineEffect<string | number | Date | undefined | unknown>
    fieldKey: string,
    required?: boolean
}
export interface AppFormDataParamArgControllerEndpoint {
    key: 'AppFormDataParam'
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

export interface BodyParamNumArgControllerEndpoint {
    key: 'BodyParamNum'
    _parameterIndex: number
    schema?: SchemaValidator<number | undefined> | SchemaValidatorRefineEffect<number | undefined>
    fieldKey: string,
    required?: boolean
}

export interface AppFormDataParamNumArgControllerEndpoint {
    key: 'AppFormDataParamNum'
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

export interface UserArgControllerEndpoint {
    key: 'User'
    _parameterIndex: number
}

export interface PtpClientUserArgControllerEndpoint {
    key: 'PtpClientUser'
    roles?: Array<'admin'>
    _parameterIndex: number
}


export interface PtpCoreUserArgControllerEndpoint {
    key: 'PtpCoreUser'
    roles?: Array<'admin'>
    _parameterIndex: number
}

export interface SystemUserArgControllerEndpoint {
    key: 'SystemUser'
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


export interface LegalEntityIdByDomainArgControllerEndpoint {
    key: 'LegalEntityIdByDomain'
    _parameterIndex: number
}

export interface PaginationQueryParamsArgControllerEndpoint<Row extends object = any> {
    key: 'PaginationQueryParams'
    _parameterIndex: number
    schema: SchemaValidator<PaginationQueryParams<Row>>
    in: 'query' | 'body'
}


export interface DashboardUserDecArgControllerEndpoint {
    key: 'DashboardUser'
    _parameterIndex: number
}


export interface SetHeaderFnDecArgControllerEndpoint {
    key: 'SetHeaderFn'
    _parameterIndex: number
}
