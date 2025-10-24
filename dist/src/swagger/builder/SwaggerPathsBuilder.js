"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SwaggerPathsBuilder = void 0;
const core_1 = require("../core");
const _swagger_1 = require("..");
const _appError_1 = require("../../appError");
class SwaggerPathsBuilder {
    constructor() {
        this.getParamsSwaggerByControllers = ({ tsSchema, className, methodName, method, args, }) => {
            if (!(args === null || args === void 0 ? void 0 : args.length)) {
                return [];
            }
            const params = [];
            const bodyParams = [];
            args.forEach((arg, index) => {
                const paramsByArg = this.getParamsByArgSwaggerByControllers({
                    tsSchema,
                    className,
                    methodName,
                    method,
                    arg,
                    index,
                });
                if (paramsByArg.length >= 1) {
                    paramsByArg.forEach((arg) => {
                        if (arg.in === 'body') {
                            bodyParams.push(arg);
                            return;
                        }
                        params.push(arg);
                    });
                }
            });
            if (bodyParams.length >= 1) {
                if (bodyParams.length === 1) {
                    params.push(bodyParams[0]);
                }
                else {
                    const allOf = [];
                    bodyParams.forEach((param) => {
                        if (param.schema) {
                            allOf.push(param.schema);
                        }
                    });
                    params.push({
                        in: 'body',
                        name: 'body',
                        required: true,
                        schema: {
                            allOf,
                        },
                    });
                }
            }
            return params;
        };
        this.buildSwaggerResponsesByErrorKeys = (errorKeys) => {
            var _a;
            const responses = errorKeys.map((errorKey) => this.buildResponseErrorDescription(errorKey));
            const map = {};
            responses.forEach((response) => {
                var _a;
                const key = (_a = response.statusCode) === null || _a === void 0 ? void 0 : _a.toString();
                if (!(key in map)) {
                    map[key] = [];
                }
                map[key].push(response);
            });
            const res = {};
            for (const statusCode in map) {
                const responses = map[statusCode];
                if (!(responses === null || responses === void 0 ? void 0 : responses.length)) {
                    continue;
                }
                res[statusCode] = {
                    description: (_a = responses === null || responses === void 0 ? void 0 : responses.map(this.getResponsesSwaggerMessageFromResponseDescription)) === null || _a === void 0 ? void 0 : _a.join(',\n----\n'),
                };
            }
            return res;
        };
        this.getBaseErrorCodesSwagger = (options) => {
            const errorCodes = [];
            if ((options === null || options === void 0 ? void 0 : options.errorKeys) && options.errorKeys.length >= 1) {
                errorCodes.push(...options.errorKeys);
            }
            if (options === null || options === void 0 ? void 0 : options.haSaveFile) {
                errorCodes.push('SAVE_FILE_ERROR');
            }
            if (options === null || options === void 0 ? void 0 : options.hasAuth) {
                errorCodes.unshift('INVALID_BEARER_TOKEN_ERROR');
                errorCodes.unshift('HEADER_VALIDATION_ERROR');
            }
            if (options === null || options === void 0 ? void 0 : options.hasDomainDb) {
                errorCodes.unshift('DOMAIN_ACCESS_DENIED_ERROR');
            }
            if (options === null || options === void 0 ? void 0 : options.hasStructure) {
                errorCodes.unshift('STRUCTURE_ACCESS_ERROR');
                errorCodes.unshift('INVALID_BEARER_TOKEN_ERROR');
                errorCodes.unshift('HEADER_VALIDATION_ERROR');
            }
            return [...new Set(errorCodes)];
        };
        this.buildConsumesSwagger = (parameters) => {
            const isFormData = parameters === null || parameters === void 0 ? void 0 : parameters.find((item) => item.in === 'formData' || item.name === 'formData');
            if (isFormData) {
                return ['multipart/form-data'];
            }
            return ['application/json'];
        };
        this.buildSecuritySwagger = (security) => {
            if (!(security === null || security === void 0 ? void 0 : security.length)) {
                return [];
            }
            const newSecurity = [];
            security.forEach((item) => {
                if (typeof item === 'string') {
                    if (item === 'auth' || item === 'structure') {
                        newSecurity.push({
                            'BearerAuth': [],
                        });
                    }
                    return;
                }
                newSecurity.push(item);
            });
            return newSecurity;
        };
        this.buildSecurityTsBuildSchema = (args, isSystemController) => {
            const options = this.getOptionsFormArgsTsBuildSchema(args);
            const res = [];
            if (options.hasAuth || isSystemController) {
                res.push('auth');
            }
            if (options.hasStructure) {
                res.push('structure');
            }
            return res;
        };
        this.getParamsByArgSwaggerByControllers = ({ tsSchema, className, methodName, method, arg, index, }) => {
            const paramsSchemas = this.getParamsByTsSchema({
                className,
                tsSchema,
                methodName,
            });
            if (!paramsSchemas.length) {
                return [];
            }
            const schema = paramsSchemas[index];
            switch (arg.key) {
                case 'Param':
                    if (!schema) {
                        return [];
                    }
                    return [
                        Object.assign(Object.assign({}, schema), { in: 'path', name: arg.fieldKey, required: typeof arg.required !== 'undefined' ? arg.required : true }),
                    ];
                case 'ParamNum':
                    if (!schema) {
                        return [];
                    }
                    return [
                        Object.assign(Object.assign({}, schema), { in: 'path', name: arg.fieldKey, required: typeof arg.required !== 'undefined' ? arg.required : true }),
                    ];
                case 'BodyParamNum':
                    return [
                        {
                            schema: {
                                type: 'object',
                                properties: {
                                    [arg.fieldKey]: schema,
                                },
                                required: arg.required ? [arg.fieldKey] : [],
                            },
                            in: 'body',
                            name: 'body',
                        },
                    ];
                case 'AppFormDataParamNum':
                    if (!schema) {
                        return [];
                    }
                    return [
                        Object.assign(Object.assign({}, schema), { in: 'formData', name: arg.fieldKey, required: typeof arg.required !== 'undefined' ? arg.required : true }),
                    ];
                case 'BodyParam':
                    if (!schema) {
                        return [];
                    }
                    return [
                        {
                            schema: {
                                type: 'object',
                                properties: {
                                    [arg.fieldKey]: schema,
                                },
                                required: arg.required ? [arg.fieldKey] : [],
                            },
                            in: 'body',
                            name: 'body',
                        },
                    ];
                case 'AppFormDataParam':
                    if (!schema) {
                        return [];
                    }
                    return [
                        Object.assign(Object.assign({}, schema), { in: 'formData', name: arg.fieldKey, required: typeof arg.required !== 'undefined' ? arg.required : true }),
                    ];
                case 'QueryParam':
                    if (!schema) {
                        return [];
                    }
                    return [
                        Object.assign(Object.assign({}, schema), { in: 'query', name: arg.fieldKey, required: typeof arg.required !== 'undefined' ? arg.required : true }),
                    ];
                case 'QueryParamDate':
                    if (!schema) {
                        return [];
                    }
                    return [
                        Object.assign(Object.assign({}, schema), { in: 'query', name: arg.fieldKey, required: typeof arg.required !== 'undefined' ? arg.required : true }),
                    ];
                case 'QueryParamNum':
                    if (!schema) {
                        return [];
                    }
                    return [
                        Object.assign(Object.assign({}, schema), { in: 'query', name: arg.fieldKey, required: typeof arg.required !== 'undefined' ? arg.required : true }),
                    ];
                case 'Body':
                    if (!schema) {
                        return [];
                    }
                    return [{
                            in: 'body',
                            name: 'body',
                            schema: schema,
                            required: true,
                        }];
                case 'QueryParams':
                    if (!schema) {
                        return [];
                    }
                    return this.transformQueryParamsSwagger({
                        params: schema,
                        type: 'query',
                        definitions: tsSchema,
                    });
                case 'FormData':
                    if (!schema) {
                        return [];
                    }
                    return this.transformQueryParamsSwagger({
                        params: schema,
                        type: 'formData',
                        definitions: tsSchema,
                    });
                case 'AppFile':
                    if (!schema) {
                        return [];
                    }
                    return [
                        {
                            in: 'formData',
                            type: 'file',
                            required: arg.required,
                            name: arg.fileKey,
                        },
                    ];
                case 'AppFiles':
                    if (!schema) {
                        return [];
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
                    ];
                case 'PaginationQueryParams':
                    if (!schema) {
                        return [];
                    }
                    if (arg.in === 'body') {
                        return [{
                                in: 'body',
                                name: 'body',
                                schema: schema,
                                required: true,
                            }];
                    }
                    return this.transformQueryParamsSwagger({
                        params: schema,
                        type: 'query',
                        definitions: tsSchema,
                    });
                case 'HeaderParam':
                    if (!schema) {
                        return [];
                    }
                    return [
                        Object.assign(Object.assign({}, schema), { in: 'header', name: arg.fieldKey, required: typeof arg.required !== 'undefined' ? arg.required : true }),
                    ];
                case 'Domain':
                    return [
                        {
                            in: 'header',
                            name: 'domain',
                            required: true,
                            type: 'string',
                            description: 'Site domain — the domain name of the client site making the request (e.g., https://example.com)',
                        },
                    ];
                default:
                    return [];
            }
        };
        this.getParamsByTsSchema = ({ tsSchema, className, methodName, }) => {
            const paramKey = core_1.SwaggerTSHelper.getParamsKeyBuildTsSchema({
                method: methodName,
                className,
            });
            const res = tsSchema[paramKey];
            if (!res || !Array.isArray(res)) {
                return [];
            }
            return res;
        };
    }
    getPathsByTSSchemas(tsSchema) {
        const swaggerInfo = _swagger_1.ControllerSwaggerInfoRegistry.getSwaggerInfoList();
        if (!(swaggerInfo === null || swaggerInfo === void 0 ? void 0 : swaggerInfo.length)) {
            return {};
        }
        const paths = {};
        swaggerInfo.forEach((item) => {
            var _a;
            if (!((_a = item.methods) === null || _a === void 0 ? void 0 : _a.length)) {
                return;
            }
            item.methods.forEach((method) => {
                var _a, _b, _c, _d, _e, _f;
                if ((_a = method === null || method === void 0 ? void 0 : method.baseInfo) === null || _a === void 0 ? void 0 : _a.disable) {
                    return;
                }
                const swaggerPathFormat = this.convertPathParams(method.path);
                if (!(swaggerPathFormat in paths)) {
                    paths[swaggerPathFormat] = {};
                }
                const endpoints = paths[swaggerPathFormat];
                const typeMethod = method.method;
                const parameters = this.getParamsSwaggerByControllers({
                    tsSchema,
                    className: item.className,
                    method: typeMethod,
                    methodName: method.methodName,
                    args: method.args,
                });
                const tag = ((_b = method.baseInfo) === null || _b === void 0 ? void 0 : _b.tag) || ((_c = item.swaggerOptions) === null || _c === void 0 ? void 0 : _c.tag) || '';
                endpoints[typeMethod] = {
                    tags: [tag],
                    description: (_d = method === null || method === void 0 ? void 0 : method.baseInfo) === null || _d === void 0 ? void 0 : _d.description,
                    summary: (_e = method === null || method === void 0 ? void 0 : method.baseInfo) === null || _e === void 0 ? void 0 : _e.summary,
                    responses: this.getResponsesSwaggerByControllers({
                        tsSchema,
                        className: item.className,
                        method: typeMethod,
                        methodName: method.methodName,
                        args: method.args,
                        errorKeys: ((_f = method.baseInfo) === null || _f === void 0 ? void 0 : _f.errorKeys) || [],
                    }),
                    parameters,
                    consumes: this.buildConsumesSwagger(parameters),
                    security: this.buildSecuritySwagger(this.buildSecurityTsBuildSchema(method.args, method.isSystemController)),
                };
            });
        });
        return paths;
    }
    convertPathParams(path) {
        return path.replace(/:([\w]+)/g, '{$1}');
    }
    getResponsesSwaggerByControllers({ tsSchema, className, methodName, method, errorKeys, args, }) {
        const responseKey = core_1.SwaggerTSHelper.getResponseKeyBuildTsSchema({
            method: methodName,
            className,
        });
        switch (method.toLocaleLowerCase()) {
            case 'put': {
                return this.buildMethodResponsesSwagger({
                    oldResponses: {
                        200: {
                            schema: tsSchema[responseKey],
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
                });
            }
            case 'post': {
                return this.buildMethodResponsesSwagger({
                    oldResponses: {
                        200: {
                            schema: tsSchema[responseKey],
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
                });
            }
            case 'delete': {
                return this.buildMethodResponsesSwagger({
                    oldResponses: {
                        200: {
                            schema: tsSchema[responseKey],
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
                });
            }
            case 'get': {
                return this.buildMethodResponsesSwagger({
                    oldResponses: {
                        200: {
                            schema: tsSchema[responseKey],
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
                });
            }
            default: {
                return {};
            }
        }
    }
    buildMethodResponsesSwagger({ options, oldResponses, appErrorKeys, }) {
        return Object.assign(Object.assign({}, this.buildSwaggerResponsesByErrorKeys([
            ...this.getBaseErrorCodesSwagger(options),
            ...appErrorKeys,
        ])), oldResponses);
    }
    getResponsesSwaggerMessageFromResponseDescription(response) {
        return `Error code: "${response.errorCode}"\n Message: ${response.message}`;
    }
    buildResponseErrorDescription(errorKey) {
        const { errorCode, statusCode, } = _appError_1.AppErrorHelper.getAppErrorCodeAndStatus({
            errorKey,
        });
        return {
            errorKey: errorKey,
            statusCode,
            errorCode,
            message: _appError_1.AppErrorHelper.getErrorMessageByErrorKey(errorKey),
        };
    }
    transformQueryParamsSwagger({ params, definitions, type, }) {
        var _a, _b;
        const res = [];
        if ((params === null || params === void 0 ? void 0 : params.anyOf) && params.anyOf.length >= 1) {
            const newParams = this.getParams({
                definition: params.anyOf[0],
                definitions,
                type,
            });
            if (newParams === null || newParams === void 0 ? void 0 : newParams.length) {
                res.push(...newParams);
            }
        }
        if (params.type === 'object' && params.properties) {
            const newParams = this.getParams({
                definition: params,
                definitions,
                type,
            });
            if (newParams === null || newParams === void 0 ? void 0 : newParams.length) {
                res.push(...newParams);
            }
        }
        const refPath = this.getRefPathSwagger(((_a = params === null || params === void 0 ? void 0 : params.schema) === null || _a === void 0 ? void 0 : _a.$ref) || (params === null || params === void 0 ? void 0 : params.$ref) || '');
        const ref = this.getRefFromPathSwagger(refPath);
        if (!(ref in definitions)) {
            return res;
        }
        const definition = definitions[ref];
        if ('anyOf' in definition && definition.anyOf && definition.anyOf.length >= 1) {
            const newParams = this.getParams({
                definition: definition.anyOf[0],
                definitions,
                type,
            });
            if (newParams === null || newParams === void 0 ? void 0 : newParams.length) {
                res.push(...newParams);
            }
        }
        if (definition.allOf && ((_b = definition.allOf) === null || _b === void 0 ? void 0 : _b.length) >= 1) {
            definition.allOf.forEach((item) => {
                const childParams = this.getParams({
                    definition: item,
                    definitions,
                    type,
                });
                if (childParams === null || childParams === void 0 ? void 0 : childParams.length) {
                    res.push(...childParams);
                }
            });
        }
        if (definition.type === 'object' && (definition === null || definition === void 0 ? void 0 : definition.properties)) {
            const newParams = this.getParams({
                definition,
                definitions,
                type,
            });
            if (newParams === null || newParams === void 0 ? void 0 : newParams.length) {
                res.push(...newParams);
            }
        }
        return res;
    }
    getKeyParam(key, parentKey) {
        if (!parentKey) {
            return key;
        }
        return `${parentKey}[${key}]`;
    }
    getParams({ definition, definitions, parentKey, type, }) {
        var _a, _b, _c;
        const res = [];
        if ((definition.type === 'string' || definition.type === 'number') && parentKey) {
            res.push({
                name: this.getKeyParam(parentKey),
                type: definition.type,
                enum: definition === null || definition === void 0 ? void 0 : definition.enum,
                in: type,
                required: typeof (definition === null || definition === void 0 ? void 0 : definition.required) === 'boolean' ? definition === null || definition === void 0 ? void 0 : definition.required : parentKey && Array.isArray(definition === null || definition === void 0 ? void 0 : definition.required) ? (_a = definition === null || definition === void 0 ? void 0 : definition.required) === null || _a === void 0 ? void 0 : _a.includes(parentKey) : false,
            });
        }
        if ('allOf' in definition && (definition === null || definition === void 0 ? void 0 : definition.allOf) && ((_b = definition === null || definition === void 0 ? void 0 : definition.allOf) === null || _b === void 0 ? void 0 : _b.length) >= 1) {
            definition.allOf.forEach((definitionChild) => {
                const newParams = this.getParams({
                    definition: definitionChild,
                    definitions,
                    parentKey,
                    type,
                });
                if (newParams === null || newParams === void 0 ? void 0 : newParams.length) {
                    res.push(...newParams);
                }
            });
        }
        if (definition === null || definition === void 0 ? void 0 : definition.$ref) {
            const refPath = this.getRefPathSwagger((definition === null || definition === void 0 ? void 0 : definition.$ref) || '');
            const ref = this.getRefFromPathSwagger(refPath);
            const childDefinition = definitions[ref];
            const newParams = this.getParams({
                definition: childDefinition,
                definitions,
                parentKey,
                type,
            });
            if (newParams === null || newParams === void 0 ? void 0 : newParams.length) {
                res.push(...newParams);
            }
        }
        if (definition === null || definition === void 0 ? void 0 : definition.properties) {
            for (const key in definition.properties) {
                const property = definition.properties[key];
                if (property.$ref) {
                    const refPath = this.getRefPathSwagger((property === null || property === void 0 ? void 0 : property.$ref) || '');
                    const ref = this.getRefFromPathSwagger(refPath);
                    if (ref in definitions) {
                        const childDefinition = definitions[ref];
                        const newParams = this.getParams({
                            definition: childDefinition,
                            definitions,
                            parentKey: this.getKeyParam(key, parentKey),
                            type,
                        });
                        if (newParams === null || newParams === void 0 ? void 0 : newParams.length) {
                            res.push(...newParams);
                        }
                    }
                    continue;
                }
                if (property.type === 'object' && property.properties) {
                    const newParams = this.getParams({
                        definition: property,
                        definitions,
                        parentKey: this.getKeyParam(key, parentKey),
                        type,
                    });
                    if ((newParams === null || newParams === void 0 ? void 0 : newParams.length) >= 1) {
                        res.push(...newParams);
                    }
                    continue;
                }
                if (property.type && property.type !== 'object') {
                    res.push({
                        name: this.getKeyParam(key, parentKey),
                        type: property.type,
                        enum: property === null || property === void 0 ? void 0 : property.enum,
                        in: type,
                        required: typeof (definition === null || definition === void 0 ? void 0 : definition.required) === 'boolean' ? definition === null || definition === void 0 ? void 0 : definition.required : Array.isArray(definition === null || definition === void 0 ? void 0 : definition.required) ? (_c = definition === null || definition === void 0 ? void 0 : definition.required) === null || _c === void 0 ? void 0 : _c.includes(key) : false,
                        items: property === null || property === void 0 ? void 0 : property.items,
                    });
                }
            }
        }
        return res;
    }
    getRefPathSwagger(refPath) {
        if (!refPath.includes('/definitions/')) {
            return `#/definitions/${refPath.slice(1)}`;
        }
        return refPath;
    }
    getRefPathKeySwagger(refPath) {
        if (!refPath.includes('/definitions')) {
            return `#/definitions/${refPath}`;
        }
        return refPath;
    }
    getRefFromPathSwagger(refPath) {
        return refPath === null || refPath === void 0 ? void 0 : refPath.slice(14);
    }
    getOptionsFormArgsTsBuildSchema(args) {
        let hasAuth = false;
        let hasDomainDb = false;
        let hasStructure = false;
        let haSaveFile = false;
        if ((args === null || args === void 0 ? void 0 : args.length) >= 1) {
            args.forEach((arg) => {
                switch (arg.key) {
                    case 'AppFiles': {
                        haSaveFile = true;
                        break;
                    }
                    case 'User': {
                        hasAuth = true;
                        break;
                    }
                    case 'PtpClientUser': {
                        hasAuth = true;
                        break;
                    }
                    case 'PtpCoreUser': {
                        hasAuth = true;
                        break;
                    }
                    case 'SystemUser': {
                        hasAuth = true;
                        break;
                    }
                    case 'Domain': {
                        hasDomainDb = true;
                        break;
                    }
                    case 'DashboardUser': {
                        hasAuth = true;
                        break;
                    }
                }
            });
        }
        return {
            hasAuth,
            hasDomainDb,
            hasStructure,
            haSaveFile,
        };
    }
}
exports.SwaggerPathsBuilder = SwaggerPathsBuilder;
//# sourceMappingURL=SwaggerPathsBuilder.js.map