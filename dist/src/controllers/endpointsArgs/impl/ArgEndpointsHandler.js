"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ArgEndpointsHandler = void 0;
const _validator_1 = require("../../../validator");
const _appError_1 = require("../../../appError");
const _domain_1 = require("../../../domain");
const _auth_1 = require("../../../auth");
const _access_1 = require("../../../access");
const _services_1 = require("../../../services");
const stringReqSchema = _validator_1.Validator.string();
const stringOptionalSchema = _validator_1.Validator.string().optional();
const numberReqSchema = _validator_1.Validator.number();
const numberOptionalSchema = _validator_1.Validator.number().optional();
const dateReqSchema = _validator_1.Validator.date();
const dateOptionalSchema = _validator_1.Validator.date().optional();
class ArgEndpointsHandler {
    async getDataByControllerMethod(controller, methodName, req, res) {
        var _a;
        const args = await this.getDataByArgs({
            args: controller.args[methodName] || [],
            res,
            req,
        });
        //@ts-ignore
        return (_a = controller[methodName]) === null || _a === void 0 ? void 0 : _a.apply(controller, args);
    }
    async getDataByArgs(props) {
        const data = [];
        for (const arg of props.args) {
            const currentData = await this.getDataByArg({
                arg,
                req: props.req,
                res: props.res,
            });
            data.push(currentData);
        }
        return data;
    }
    async getDataByArg({ arg, res, req, }) {
        switch (arg.key) {
            case 'QueryParams': {
                return this.validationBySchema(req.query, arg.schema);
            }
            case 'Body': {
                return this.validationBySchema(req.body, arg.schema);
            }
            case 'Params':
                return this.validationBySchema(req.params, arg.schema);
            case 'Param':
                return this.validationPrimitiveBySchema(req.params[arg.fieldKey], arg.schema ? arg.schema : arg.required ? stringReqSchema : stringOptionalSchema, arg.fieldKey);
            case 'ParamNum':
                return this.validationPrimitiveBySchema(req.params[arg.fieldKey], arg.schema ? arg.schema : arg.required ? numberReqSchema : numberOptionalSchema, arg.fieldKey);
            case 'QueryParam':
                return this.validationPrimitiveBySchema(req.query[arg.fieldKey], arg.schema ? arg.schema : arg.required ? stringReqSchema : stringOptionalSchema, arg.fieldKey);
            case 'QueryParamNum':
                return this.validationPrimitiveBySchema(req.query[arg.fieldKey], arg.schema ? arg.schema : arg.required ? numberReqSchema : numberOptionalSchema, arg.fieldKey);
            case 'QueryParamDate':
                return this.validationPrimitiveBySchema(req.query[arg.fieldKey], arg.schema ? arg.schema : arg.required ? dateReqSchema : dateOptionalSchema, arg.fieldKey);
            case 'FormData':
                return this.validationBySchema(req.body, arg.schema);
            case 'AppFile': {
                const key = arg.fileKey || 'file';
                //@ts-ignore
                const files = req.files && key in req.files ? req.files[key] : null;
                if (!(files === null || files === void 0 ? void 0 : files.length)) {
                    return null;
                }
                return files[0];
            }
            case 'AppFiles': {
                const key = arg.fileKey || 'files';
                //@ts-ignore
                return req.files && key in req.files ? req.files[key] : [];
            }
            case 'Auth':
                const user = await _auth_1.AuthService.checkTokenAndGetUserInfo(_auth_1.AuthHelper.getTokenFromReq(req));
                res.locals.user = user;
                return user;
            case 'PtpClientAuth':
                const ptpUser = await _auth_1.PtpClientAuthService.checkTokenAndGetUserInfo({
                    domain: _domain_1.DomainHelper.getDomainFromReq(req),
                    token: _auth_1.AuthHelper.getTokenFromReq(req),
                    roles: arg.roles,
                });
                res.locals.user = ptpUser;
                return ptpUser;
            case 'PtpCoreAuth':
                const ptpCoreUser = await _auth_1.PtpCoreAuthService.checkTokenAndGetUserInfo({
                    token: _auth_1.AuthHelper.getTokenFromReq(req),
                    roles: arg.roles,
                });
                res.locals.user = ptpCoreUser;
                return ptpCoreUser;
            case 'SystemAuth':
                const systemUser = await _auth_1.AuthService.checkSystemTokenAndGetUserInfo(_auth_1.AuthHelper.getTokenFromReq(req));
                res.locals.user = systemUser;
                return systemUser;
            case 'Domain':
                return _domain_1.DomainHelper.getDomainFromReq(req);
            case 'PaginationQueryParams': {
                return this.validationBySchema(arg.in === 'body' ? req.body : req.query, arg.schema);
            }
            case 'LegalEntityIdByDomain': {
                return await _services_1.OsCoreLegalEntityService.getIdByDomain(_domain_1.DomainHelper.getDomainFromReq(req));
            }
            case 'DeleteOldFileIfNull': {
                const key = arg.fileKey || 'file';
                return key in req.body && typeof req.body[key] === 'string' && req.body[key] === 'null';
            }
            case 'Headers': {
                if (arg === null || arg === void 0 ? void 0 : arg.schema) {
                    return this.validationBySchema(req.headers, arg.schema);
                }
                return req.headers;
            }
            case 'Header':
                return this.validationPrimitiveBySchema(req.headers[arg.fieldKey], arg.schema ? arg.schema : arg.required ? stringReqSchema : stringOptionalSchema, arg.fieldKey);
            case 'DashboardAccessDec': {
                const dashboardUser = await _access_1.DashboardAccessService.checkAccessByToken(_auth_1.AuthHelper.getTokenFromReq(req).replace('Bearer ', ''));
                res.locals.user = dashboardUser;
                return dashboardUser;
            }
            case 'Locale': {
                return res.locals.locale || null;
            }
            case 'SetResponseStatus': {
                return (status) => {
                    res.status(status);
                };
            }
            case 'CustomArg': {
                return await arg.getValueCb(req, res);
            }
            case 'AppResponse':
                return res;
        }
    }
    validationBySchema(value, schema) {
        const { errors, error, data, } = schema.validate(value);
        if (error) {
            throw new _appError_1.AppError('Validation error', {
                errorKey: 'VALIDATION_ERROR',
                errors,
            });
        }
        return data;
    }
    validationPrimitiveBySchema(value, schema, fieldKey) {
        const { errors, error, data, } = schema.validate(value);
        if (error) {
            throw new _appError_1.AppError('Validation error', {
                errorKey: 'VALIDATION_ERROR',
                errors: [`${fieldKey}:${errors === null || errors === void 0 ? void 0 : errors.join(',')}`],
            });
        }
        return data;
    }
}
exports.ArgEndpointsHandler = ArgEndpointsHandler;
//# sourceMappingURL=ArgEndpointsHandler.js.map