import {ArgControllerEndpoint, Controller, IArgEndpointsHandler} from '@controllers'
import {SchemaValidator, SchemaValidatorRefineEffect, Validator} from '@validator'
import {AppError} from '@appError'
import {DomainHelper} from '@domain'
import {AuthHelper, AuthService, PtpClientAuthService, PtpCoreAuthService} from '@auth'
import {DashboardAccessService} from '@access'
import {OsCoreLegalEntityService} from '@services'
import {AppRequest} from '@appRequest'
import {AppResponse} from '@appResponse'

const stringReqSchema = Validator.string()
const stringOptionalSchema = Validator.string().optional()

const numberReqSchema = Validator.number()
const numberOptionalSchema = Validator.number().optional()

const dateReqSchema = Validator.date()
const dateOptionalSchema = Validator.date().optional()


export class ArgEndpointsHandler implements IArgEndpointsHandler {
    
    public async getDataByControllerMethod<Data>(
        controller: Controller,
        methodName: string,
        req: AppRequest,
        res: AppResponse,
    ): Promise<Data> {
        const args = await this.getDataByArgs({
            args: controller.args[methodName] || [],
            res,
            req,
        })
        //@ts-ignore
        return controller[methodName]?.apply(controller, args)
    }
    
    public async getDataByArgs(props: {
        req: AppRequest,
        res: AppResponse,
        args: ArgControllerEndpoint[]
    }): Promise<any[]> {
        const data: any[] = []
        for (const arg of props.args) {
            const currentData = await this.getDataByArg({
                arg,
                req: props.req,
                res: props.res,
            })
            data.push(currentData)
        }
        return data
    }
    
    private async getDataByArg({
                                   arg,
                                   res,
                                   req,
                               }: {
        req: AppRequest,
        res: AppResponse,
        arg: ArgControllerEndpoint
    }): Promise<any> {
        
        switch (arg.key) {
            case 'QueryParams': {
                return this.validationBySchema(req.query, arg.schema)
            }
            case 'Body': {
                return this.validationBySchema(req.body, arg.schema)
            }
            case 'Params':
                return this.validationBySchema(req.params, arg.schema)
            
            case 'Param':
                return this.validationPrimitiveBySchema(
                    req.params[arg.fieldKey],
                    arg.schema ? arg.schema : arg.required ? stringReqSchema : stringOptionalSchema,
                    arg.fieldKey,
                )
            case 'ParamNum':
                return this.validationPrimitiveBySchema(
                    req.params[arg.fieldKey],
                    arg.schema ? arg.schema : arg.required ? numberReqSchema : numberOptionalSchema,
                    arg.fieldKey,
                )
            case 'QueryParam':
                return this.validationPrimitiveBySchema(
                    req.query[arg.fieldKey],
                    arg.schema ? arg.schema : arg.required ? stringReqSchema : stringOptionalSchema,
                    arg.fieldKey,
                )
            case 'QueryParamNum':
                return this.validationPrimitiveBySchema(
                    req.query[arg.fieldKey],
                    arg.schema ? arg.schema : arg.required ? numberReqSchema : numberOptionalSchema,
                    arg.fieldKey,
                )
            case 'QueryParamDate':
                return this.validationPrimitiveBySchema(
                    req.query[arg.fieldKey],
                    arg.schema ? arg.schema : arg.required ? dateReqSchema : dateOptionalSchema,
                    arg.fieldKey,
                )
            case 'FormData':
                return this.validationBySchema(req.body, arg.schema)
            case 'AppFile' : {
                const key = arg.fileKey || 'file'
                //@ts-ignore
                const files = req.files && key in req.files ? req.files[key] : null
                if (!files?.length) {
                    return null
                }
                return files[0]
            }
            
            case 'AppFiles' : {
                const key = arg.fileKey || 'files'
                //@ts-ignore
                return req.files && key in req.files ? req.files[key] : []
            }
            case 'Auth':
                const user = await AuthService.checkTokenAndGetUserInfo(AuthHelper.getTokenFromReq(req))
                res.locals.user = user
                return user
            case 'PtpClientAuth':
                const ptpUser = await PtpClientAuthService.checkTokenAndGetUserInfo({
                    domain: DomainHelper.getDomainFromReq(req),
                    token: AuthHelper.getTokenFromReq(req),
                    roles: arg.roles,
                })
                res.locals.user = ptpUser
                return ptpUser
            case 'PtpCoreAuth':
                const ptpCoreUser = await PtpCoreAuthService.checkTokenAndGetUserInfo({
                    token: AuthHelper.getTokenFromReq(req),
                    roles: arg.roles,
                })
                res.locals.user = ptpCoreUser
                return ptpCoreUser
            case 'SystemAuth':
                const systemUser = await AuthService.checkSystemTokenAndGetUserInfo(AuthHelper.getTokenFromReq(req))
                res.locals.user = systemUser
                return systemUser
            case 'Domain':
                return DomainHelper.getDomainFromReq(req)
            case 'PaginationQueryParams': {
                return this.validationBySchema(arg.in === 'body' ? req.body : req.query, arg.schema)
            }
            
            case 'LegalEntityIdByDomain': {
                return await OsCoreLegalEntityService.getIdByDomain(DomainHelper.getDomainFromReq(req))
            }
            case 'DeleteOldFileIfNull': {
                const key = arg.fileKey || 'file'
                return key in req.body && typeof req.body[key] === 'string' && req.body[key] === 'null'
            }
            
            case 'Headers': {
                if (arg?.schema) {
                    return this.validationBySchema(req.headers, arg.schema)
                }
                return req.headers
            }
            case 'Header':
                return this.validationPrimitiveBySchema(
                    req.headers[arg.fieldKey],
                    arg.schema ? arg.schema : arg.required ? stringReqSchema : stringOptionalSchema,
                    arg.fieldKey,
                )
            case 'DashboardAccessDec': {
                const dashboardUser = await DashboardAccessService.checkAccessByToken(AuthHelper.getTokenFromReq(req).replace('Bearer ', ''))
                res.locals.user = dashboardUser
                return dashboardUser
            }
            
            case 'Locale': {
                return res.locals.locale || null
            }
            
            case 'SetResponseStatus': {
                return (status: number) => {
                    res.status(status)
                }
            }
            case 'CustomArg': {
                return await arg.getValueCb(req, res)
            }
            
            case 'AppResponse':
                return res
        }
        
    }
    
    private validationBySchema(
        value: unknown,
        schema: SchemaValidator | SchemaValidatorRefineEffect,
    ): any {
        const {
            errors,
            error,
            data,
        } = schema.validate(value)
        if (error) {
            throw new AppError('Validation error', {
                errorKey: 'VALIDATION_ERROR',
                errors,
            })
        }
        return data
    }
    
    private validationPrimitiveBySchema(
        value: unknown,
        schema: SchemaValidator | SchemaValidatorRefineEffect,
        fieldKey: string,
    ): any {
        const {
            errors,
            error,
            data,
        } = schema.validate(value)
        if (error) {
            throw new AppError('Validation error', {
                errorKey: 'VALIDATION_ERROR',
                errors: [`${fieldKey}:${errors?.join(',')}`],
            })
        }
        return data
    }
    
    
}