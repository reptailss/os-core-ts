"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ArgsResolver = void 0;
const _validator_1 = require("../../../validator");
const _appError_1 = require("../../../appError");
const _auth_1 = require("../../../auth");
const _domain_1 = require("../../../domain");
const _services_1 = require("../../../services");
const _access_1 = require("../../../access");
const stringReqSchema = _validator_1.Validator.string();
const stringOptionalSchema = _validator_1.Validator.string().optional();
const numberReqSchema = _validator_1.Validator.number();
const numberOptionalSchema = _validator_1.Validator.number().optional();
const dateReqSchema = _validator_1.Validator.date();
const dateOptionalSchema = _validator_1.Validator.date().optional();
function validationBySchema(value, schema) {
    const { errors, error, data } = schema.validate(value);
    if (error) {
        throw new _appError_1.AppError('Validation error', {
            errorKey: 'VALIDATION_ERROR',
            errors,
        });
    }
    return data;
}
function validationPrimitiveBySchema(value, schema, fieldKey) {
    const { errors, error, data } = schema.validate(value);
    if (error) {
        throw new _appError_1.AppError(`Validation error in field ${fieldKey}`, {
            errorKey: 'VALIDATION_ERROR',
            errors,
        });
    }
    return data;
}
function resolveSchema(arg, type) {
    if (arg.schema)
        return arg.schema;
    if (type === 'string')
        return arg.required ? stringReqSchema : stringOptionalSchema;
    if (type === 'number')
        return arg.required ? numberReqSchema : numberOptionalSchema;
    if (type === 'date')
        return arg.required ? dateReqSchema : dateOptionalSchema;
    return arg.required ? stringReqSchema : stringOptionalSchema;
}
exports.ArgsResolver = {
    QueryParams: (req, res, arg) => validationBySchema(req.query, arg.schema),
    Body: (req, res, arg) => validationBySchema(req.body, arg.schema),
    Param: (req, res, arg) => validationPrimitiveBySchema(req.params[arg.fieldKey], resolveSchema(arg, 'string'), arg.fieldKey),
    ParamNum: (req, res, arg) => validationPrimitiveBySchema(req.params[arg.fieldKey], resolveSchema(arg, 'number'), arg.fieldKey),
    QueryParam: (req, res, arg) => validationPrimitiveBySchema(req.query[arg.fieldKey], resolveSchema(arg, 'string'), arg.fieldKey),
    QueryParamNum: (req, res, arg) => validationPrimitiveBySchema(req.query[arg.fieldKey], resolveSchema(arg, 'number'), arg.fieldKey),
    QueryParamDate: (req, res, arg) => validationPrimitiveBySchema(req.query[arg.fieldKey], resolveSchema(arg, 'date'), arg.fieldKey),
    FormData: (req, res, arg) => validationBySchema(req.body, arg.schema),
    AppFormDataParam: (req, res, arg) => validationPrimitiveBySchema(req.body[arg.fieldKey], resolveSchema(arg, 'string'), arg.fieldKey),
    AppFormDataParamNum: (req, res, arg) => validationPrimitiveBySchema(req.body[arg.fieldKey], resolveSchema(arg, 'number'), arg.fieldKey),
    BodyParam: (req, res, arg) => validationPrimitiveBySchema(req.body[arg.fieldKey], resolveSchema(arg, 'string'), arg.fieldKey),
    BodyParamNum: (req, res, arg) => validationPrimitiveBySchema(req.body[arg.fieldKey], resolveSchema(arg, 'number'), arg.fieldKey),
    HeaderParam: (req, res, arg) => validationPrimitiveBySchema(req.headers[arg.fieldKey], resolveSchema(arg, 'string'), arg.fieldKey),
    AppResponse: (_req, res, _arg) => res,
    AppFile: (req, res, arg) => {
        const key = arg.fileKey || 'file';
        // @ts-ignore
        const files = req.files && key in req.files ? req.files[key] : null;
        return !(files === null || files === void 0 ? void 0 : files.length) ? null : files[0];
    },
    AppFiles: (req, res, arg) => {
        const key = arg.fileKey || 'files';
        // @ts-ignore
        return req.files && key in req.files ? req.files[key] : [];
    },
    User: async (req, res, _arg) => {
        const user = await _auth_1.AuthService.checkTokenAndGetUser(_auth_1.AuthHelper.getTokenFromReq(req));
        res.locals.user = user;
        return user;
    },
    PtpClientUser: async (req, res, arg) => {
        const user = await _auth_1.PtpClientUserService.checkTokenAndGetUser({
            domain: _domain_1.DomainHelper.getDomainFromReq(req),
            token: _auth_1.AuthHelper.getTokenFromReq(req),
            roles: arg.roles,
        });
        res.locals.user = user;
        return user;
    },
    PtpCoreUser: async (req, res, arg) => {
        const user = await _auth_1.PtpCoreUserService.checkTokenAndGetUser({
            token: _auth_1.AuthHelper.getTokenFromReq(req),
            roles: arg.roles,
        });
        res.locals.user = user;
        return user;
    },
    SystemUser: async (req, res, arg) => {
        const user = await _auth_1.AuthService.checkSystemTokenAndGetUser(_auth_1.AuthHelper.getTokenFromReq(req));
        res.locals.user = user;
        return user;
    },
    Domain: (req, res, _arg) => _domain_1.DomainHelper.getDomainFromReq(req),
    PaginationQueryParams: (req, res, arg) => validationBySchema(arg.in === 'body' ? req.body : req.query, arg.schema),
    LegalEntityIdByDomain: async (req, res, arg) => _services_1.OsCoreLegalEntityService.getIdByDomain(_domain_1.DomainHelper.getDomainFromReq(req)),
    DeleteOldFileIfNull: (req, res, arg) => {
        const key = arg.fileKey || 'file';
        return (key in req.body &&
            typeof req.body[key] === 'string' &&
            req.body[key] === 'null');
    },
    DashboardUser: async (req, res, arg) => {
        const user = await _access_1.DashboardUserService.checkAccessByToken(_auth_1.AuthHelper.getTokenFromReq(req).replace('Bearer ', ''));
        res.locals.user = user;
        return user;
    },
    Locale: (_req, res, _arg) => res.locals.locale || null,
    SetResponseStatus: (req, res, arg) => (status) => res.status(status),
    CustomArg: async (req, res, arg) => arg.getValueCb(req, res),
    SetHeaderFn: (req, res, arg) => (name, value) => res.setHeader(name, value),
};
//# sourceMappingURL=ArgResolver.js.map