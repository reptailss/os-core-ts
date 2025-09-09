"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DefaultRouteRegistrars = void 0;
const _controllers_1 = require("../../controllers");
const _appError_1 = require("../../appError");
const _responseFormat_1 = require("../../responseFormat");
const _logger_1 = require("../../logger");
const formDataArgsEndpointsHandler = new _controllers_1.FormDataArgsEndpointsHandler();
const argEndpointsHandler = new _controllers_1.ArgEndpointsHandler();
class DefaultRouteRegistrars {
    getGetHandler() {
        return (router, endpoint, controller) => {
            router.get(_controllers_1.ControllersHelper.buildEndpointUrl({
                endpointPath: endpoint.path,
                isSystemEndpoint: endpoint.type === 'system',
            }), this.getDefaultControllerHandler(endpoint, controller));
        };
    }
    getPostHandler() {
        return (router, endpoint, controller) => {
            const formDataArgs = formDataArgsEndpointsHandler.getFormDataEndpointArgs(controller.args[endpoint._propertyKey] || []);
            if (formDataArgs) {
                router.post(_controllers_1.ControllersHelper.buildEndpointUrl({
                    endpointPath: endpoint.path,
                    isSystemEndpoint: endpoint.type === 'system',
                }), this.getFormDataControllerHandler(formDataArgs), this.getDefaultControllerHandler(endpoint, controller));
                return;
            }
            router.post(_controllers_1.ControllersHelper.buildEndpointUrl({
                endpointPath: endpoint.path,
                isSystemEndpoint: endpoint.type === 'system',
            }), this.getDefaultControllerHandler(endpoint, controller));
        };
    }
    getPutHandler() {
        return (router, endpoint, controller) => {
            const formDataArgs = formDataArgsEndpointsHandler.getFormDataEndpointArgs(controller.args[endpoint._propertyKey] || []);
            if (formDataArgs) {
                router.put(_controllers_1.ControllersHelper.buildEndpointUrl({
                    endpointPath: endpoint.path,
                    isSystemEndpoint: endpoint.type === 'system',
                }), this.getFormDataControllerHandler(formDataArgs), this.getDefaultControllerHandler(endpoint, controller));
                return;
            }
            router.put(_controllers_1.ControllersHelper.buildEndpointUrl({
                endpointPath: endpoint.path,
                isSystemEndpoint: endpoint.type === 'system',
            }), this.getDefaultControllerHandler(endpoint, controller));
        };
    }
    getDeleteHandler() {
        return (router, endpoint, controller) => {
            router.delete(_controllers_1.ControllersHelper.buildEndpointUrl({
                endpointPath: endpoint.path,
                isSystemEndpoint: endpoint.type === 'system',
            }), this.getDefaultControllerHandler(endpoint, controller));
        };
    }
    getDefaultControllerHandler(endpoint, controller) {
        const args = controller.args[endpoint._propertyKey];
        return async (req, res, next) => {
            var _a;
            this.setHeadersControllerMethod(controller, endpoint._propertyKey, res);
            try {
                const data = await argEndpointsHandler.getDataByControllerMethod(controller, endpoint._propertyKey, req, res);
                if (!!(args === null || args === void 0 ? void 0 : args.find((arg) => arg.key === 'AppResponse'))) {
                    return;
                }
                if (endpoint.type === 'sendFileByPath') {
                    return res.sendFile(data, {
                        root: (_a = endpoint.options) === null || _a === void 0 ? void 0 : _a.root,
                    });
                }
                if (endpoint.type !== 'sendFile') {
                    res._body = data;
                }
                res.send(data);
            }
            catch (error) {
                this.requestErrorHandler(error, res);
            }
        };
    }
    getFormDataControllerHandler(args) {
        return async (req, res, next) => {
            const errors = await formDataArgsEndpointsHandler.handleFormDataArgs({
                fileArgs: args,
                req,
                res,
            });
            if (errors) {
                const errorProps = _appError_1.AppErrorHelper.getAppErrorCodeAndStatus({
                    errorCode: errors.errorKey,
                });
                res.status(400).send(_responseFormat_1.BuildResponseFormat.errors({
                    errors: errors.errors || [],
                    errorCode: errorProps.errorCode,
                    statusCode: errorProps.statusCode,
                }));
                return;
            }
            next();
        };
    }
    requestErrorHandler(error, res) {
        const errorResult = _appError_1.AppErrorHelper.buildErrorResultFromError(error);
        if (!(error instanceof _appError_1.AppError)) {
            _logger_1.appLogger.error('Unexpected error:', error);
        }
        res._body = {
            error: true,
            status: errorResult.status,
            errors: errorResult.errors,
            error_code: errorResult.error_code,
        };
        res.status(errorResult.status).send(errorResult);
    }
    setHeadersControllerMethod(controller, methodName, res) {
        if (controller.headers &&
            methodName in controller.headers &&
            controller.headers[methodName]) {
            const headers = controller.headers[methodName];
            for (const key in headers) {
                res.setHeader(key, headers[key]);
            }
        }
    }
}
exports.DefaultRouteRegistrars = DefaultRouteRegistrars;
//# sourceMappingURL=DefaultRouteRegistrars.js.map