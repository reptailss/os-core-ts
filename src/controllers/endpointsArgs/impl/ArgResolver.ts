import {AppRequest} from '@appRequest'
import {AppResponse} from '@appResponse'
import {
    AppFileArgControllerEndpoint,
    AppFilesArgControllerEndpoint,
    AppFormDataParamArgControllerEndpoint,
    AppFormDataParamNumArgControllerEndpoint,
    AppResponseArgControllerEndpoint,
    ArgControllerEndpoint,
    BodyArgControllerEndpoint,
    BodyParamArgControllerEndpoint,
    BodyParamNumArgControllerEndpoint,
    CustomArgControllerEndpoint,
    DashboardUserDecArgControllerEndpoint,
    DeleteOldFileIfNullArgControllerEndpoint,
    DomainArgControllerEndpoint,
    FormDataArgControllerEndpoint,
    HeaderParamArgControllerEndpoint,
    LegalEntityIdByDomainArgControllerEndpoint,
    LocaleArgControllerEndpoint,
    PaginationQueryParamsArgControllerEndpoint,
    ParamArgControllerEndpoint,
    ParamNumArgControllerEndpoint,
    PtpClientUserArgControllerEndpoint,
    PtpCoreUserArgControllerEndpoint,
    QueryParamArgControllerEndpoint,
    QueryParamDateArgControllerEndpoint,
    QueryParamNumArgControllerEndpoint,
    QueryParamsArgControllerEndpoint,
    SetHeaderFnDecArgControllerEndpoint,
    SetResponseStatusArgControllerEndpoint,
    SystemUserArgControllerEndpoint,
    UserArgControllerEndpoint,
} from '@controllers'
import {SchemaValidator, SchemaValidatorRefineEffect, Validator} from '@validator'
import {AppError} from '@appError'
import {AuthHelper, AuthService, PtpClientUserService, PtpCoreUserService} from '@auth'
import {DomainHelper} from '@domain'
import {OsCoreLegalEntityService} from '@services'
import {DashboardUserService} from '@access'

const stringReqSchema = Validator.string()
const stringOptionalSchema = Validator.string().optional()

const numberReqSchema = Validator.number()
const numberOptionalSchema = Validator.number().optional()

const dateReqSchema = Validator.date()
const dateOptionalSchema = Validator.date().optional()


function validationBySchema(
    value: unknown,
    schema: SchemaValidator | SchemaValidatorRefineEffect,
): any {
    const {errors, error, data} = schema.validate(value)
    if (error) {
        throw new AppError('Validation error', {
            errorKey: 'VALIDATION_ERROR',
            errors,
        })
    }
    return data
}

function validationPrimitiveBySchema(
    value: unknown,
    schema: SchemaValidator<any> | SchemaValidatorRefineEffect<any>,
    fieldKey: string,
): any {
    const {errors, error, data} = schema.validate(value)
    if (error) {
        throw new AppError(`Validation error in field ${fieldKey}`, {
            errorKey: 'VALIDATION_ERROR',
            errors,
        })
    }
    return data
}

function resolveSchema(
    arg: {schema?: SchemaValidator | SchemaValidatorRefineEffect; required?: boolean},
    type: 'string' | 'number' | 'date',
): SchemaValidator | SchemaValidatorRefineEffect {
    if (arg.schema) return arg.schema
    if (type === 'string') return arg.required ? stringReqSchema : stringOptionalSchema
    if (type === 'number') return arg.required ? numberReqSchema : numberOptionalSchema
    if (type === 'date') return arg.required ? dateReqSchema : dateOptionalSchema
    return arg.required ? stringReqSchema : stringOptionalSchema
}


type ArgsMapResolver = {
    [K in ArgControllerEndpoint['key']]: (
        req: AppRequest,
        res: AppResponse,
        arg: Extract<ArgControllerEndpoint, {key: K}>,
    ) => Promise<any> | any
}

export const ArgsResolver: ArgsMapResolver = {
    QueryParams: (
        req: AppRequest,
        res: AppResponse,
        arg: QueryParamsArgControllerEndpoint,
    ) => validationBySchema(req.query, arg.schema),
    
    Body: (
        req: AppRequest,
        res: AppResponse,
        arg: BodyArgControllerEndpoint,
    ) => validationBySchema(req.body, arg.schema),
    
    
    Param: (
        req: AppRequest,
        res: AppResponse,
        arg: ParamArgControllerEndpoint,
    ) => validationPrimitiveBySchema(
        req.params[arg.fieldKey],
        resolveSchema(arg, 'string'),
        arg.fieldKey,
    ),
    
    ParamNum: (
        req: AppRequest,
        res: AppResponse,
        arg: ParamNumArgControllerEndpoint,
    ) =>
        validationPrimitiveBySchema(
            req.params[arg.fieldKey],
            resolveSchema(arg, 'number'),
            arg.fieldKey,
        ),
    
    QueryParam: (
        req: AppRequest,
        res: AppResponse,
        arg: QueryParamArgControllerEndpoint,
    ) => validationPrimitiveBySchema(
        req.query[arg.fieldKey],
        resolveSchema(arg, 'string'),
        arg.fieldKey,
    ),
    
    QueryParamNum: (
        req: AppRequest,
        res: AppResponse,
        arg: QueryParamNumArgControllerEndpoint,
    ) => validationPrimitiveBySchema(
        req.query[arg.fieldKey],
        resolveSchema(arg, 'number'),
        arg.fieldKey,
    ),
    
    QueryParamDate: (
        req: AppRequest,
        res: AppResponse,
        arg: QueryParamDateArgControllerEndpoint,
    ) =>
        validationPrimitiveBySchema(
            req.query[arg.fieldKey],
            resolveSchema(arg, 'date'),
            arg.fieldKey,
        ),
    
    
    FormData: (
        req: AppRequest,
        res: AppResponse,
        arg: FormDataArgControllerEndpoint,
    ) => validationBySchema(req.body, arg.schema),
    
    AppFormDataParam: (
        req: AppRequest,
        res: AppResponse,
        arg: AppFormDataParamArgControllerEndpoint,
    ) => validationPrimitiveBySchema(
        req.body[arg.fieldKey],
        resolveSchema(arg, 'string'),
        arg.fieldKey
    ),
    
    AppFormDataParamNum: (
        req: AppRequest,
        res: AppResponse,
        arg: AppFormDataParamNumArgControllerEndpoint,
    ) =>
        validationPrimitiveBySchema(
            req.body[arg.fieldKey],
            resolveSchema(arg, 'number'),
            arg.fieldKey
        ),
    
    BodyParam: (
        req: AppRequest,
        res: AppResponse,
        arg: BodyParamArgControllerEndpoint,
    ) => validationPrimitiveBySchema(
        req.body [arg.fieldKey],
        resolveSchema(arg, 'string'),
        arg.fieldKey
    ),
    
    BodyParamNum: (
        req: AppRequest,
        res: AppResponse,
        arg: BodyParamNumArgControllerEndpoint,
    ) =>
        validationPrimitiveBySchema(
            req.body [arg.fieldKey],
            resolveSchema(arg, 'number'),
            arg.fieldKey
        ),
    
    HeaderParam: (
        req: AppRequest,
        res: AppResponse,
        arg: HeaderParamArgControllerEndpoint,
    ) => validationPrimitiveBySchema(
        req.headers[arg.fieldKey],
        resolveSchema(arg, 'string'),
        arg.fieldKey,
    ),
    
    AppResponse: (
        _req: AppRequest,
        res: AppResponse,
        _arg: AppResponseArgControllerEndpoint,
    ) => res,
    
    AppFile: (
        req: AppRequest,
        res: AppResponse,
        arg: AppFileArgControllerEndpoint,
    ) => {
        const key = arg.fileKey || 'file'
        // @ts-ignore
        const files = req.files && key in req.files ? req.files[key] : null
        return !files?.length ? null : files[0]
    },
    
    AppFiles: (
        req: AppRequest,
        res: AppResponse,
        arg: AppFilesArgControllerEndpoint,
    ) => {
        const key = arg.fileKey || 'files'
        // @ts-ignore
        return req.files && key in req.files ? req.files[key] : []
    },
    
    User: async (
        req: AppRequest,
        res: AppResponse,
        _arg: UserArgControllerEndpoint,
    ) => {
        const user = await AuthService.checkTokenAndGetUser(
            AuthHelper.getTokenFromReq(req),
        )
        res.locals.user = user
        return user
    },
    
    PtpClientUser: async (
        req: AppRequest,
        res: AppResponse,
        arg: PtpClientUserArgControllerEndpoint,
    ) => {
        const user = await PtpClientUserService.checkTokenAndGetUser({
            domain: DomainHelper.getDomainFromReq(req),
            token: AuthHelper.getTokenFromReq(req),
            roles: arg.roles,
        })
        res.locals.user = user
        return user
    },
    
    PtpCoreUser: async (
        req: AppRequest,
        res: AppResponse,
        arg: PtpCoreUserArgControllerEndpoint,
    ) => {
        const user = await PtpCoreUserService.checkTokenAndGetUser({
            token: AuthHelper.getTokenFromReq(req),
            roles: arg.roles,
        })
        res.locals.user = user
        return user
    },
    
    SystemUser: async (
        req: AppRequest,
        res: AppResponse,
        arg: SystemUserArgControllerEndpoint,
    ) => {
        const user = await AuthService.checkSystemTokenAndGetUser(
            AuthHelper.getTokenFromReq(req),
        )
        res.locals.user = user
        return user
    },
    
    Domain: (
        req: AppRequest,
        res: AppResponse,
        _arg: DomainArgControllerEndpoint,
    ) => DomainHelper.getDomainFromReq(req),
    
    PaginationQueryParams: (
        req: AppRequest,
        res: AppResponse,
        arg: PaginationQueryParamsArgControllerEndpoint,
    ) =>
        validationBySchema(
            arg.in === 'body' ? req.body : req.query,
            arg.schema,
        ),
    
    LegalEntityIdByDomain: async (
        req: AppRequest,
        res: AppResponse,
        arg: LegalEntityIdByDomainArgControllerEndpoint,
    ) =>
        OsCoreLegalEntityService.getIdByDomain(
            DomainHelper.getDomainFromReq(req),
        ),
    
    DeleteOldFileIfNull: (
        req: AppRequest,
        res: AppResponse,
        arg: DeleteOldFileIfNullArgControllerEndpoint,
    ) => {
        const key = arg.fileKey || 'file'
        return (
            key in req.body &&
            typeof req.body[key] === 'string' &&
            req.body[key] === 'null'
        )
    },
    
    DashboardUser: async (
        req: AppRequest,
        res: AppResponse,
        arg: DashboardUserDecArgControllerEndpoint,
    ) => {
        const user = await DashboardUserService.checkAccessByToken(
            AuthHelper.getTokenFromReq(req).replace('Bearer ', ''),
        )
        res.locals.user = user
        return user
    },
    
    Locale: (
        _req: AppRequest,
        res: AppResponse,
        _arg: LocaleArgControllerEndpoint,
    ) => res.locals.locale || null,
    
    SetResponseStatus: (
        req: AppRequest,
        res: AppResponse,
        arg: SetResponseStatusArgControllerEndpoint,
    ) => (status: number) => res.status(status),
    
    CustomArg: async <T>(
        req: AppRequest,
        res: AppResponse,
        arg: CustomArgControllerEndpoint<T>,
    ) => arg.getValueCb(req, res),
    
    SetHeaderFn: (
        req: AppRequest,
        res: AppResponse,
        arg: SetHeaderFnDecArgControllerEndpoint,
    ) => (name: string, value: string | number | readonly string[]) =>
        res.setHeader(name, value),
}
