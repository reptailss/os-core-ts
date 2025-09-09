"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RequestsLoggerInitializer = void 0;
const winston_1 = __importDefault(require("winston"));
const express_winston_1 = __importDefault(require("express-winston"));
const _appConfig_1 = require("../../../appConfig");
const core_1 = require("../../core");
const _systemRoutes_1 = require("../../../systemRoutes");
class RequestsLoggerInitializer {
    buildMiddleware() {
        const transports = [
            new winston_1.default.transports.File({
                level: 'info',
                filename: core_1.RequestsLoggerHelper.getFilePath(),
                format: winston_1.default.format.combine(winston_1.default.format.timestamp(), winston_1.default.format.printf((info) => {
                    var _a;
                    if ((_a = info === null || info === void 0 ? void 0 : info.meta) === null || _a === void 0 ? void 0 : _a.responseTime) {
                        delete info.meta.responseTime;
                    }
                    return `${JSON.stringify(info.meta)},`;
                })),
            }),
        ];
        if (_appConfig_1.APP_CONFIG_OS_CORE.logger.hasRequestConsoleLogger) {
            transports.push(new winston_1.default.transports.Console({
                format: winston_1.default.format.combine(winston_1.default.format.splat(), winston_1.default.format.colorize(), winston_1.default.format.simple()),
            }));
        }
        const skipMap = this.getSkipUrlsMapBySystemRoutes([
            _systemRoutes_1.SYSTEM_ROUTES.osLogs,
            _systemRoutes_1.SYSTEM_ROUTES.osRequestsInfo,
            _systemRoutes_1.SYSTEM_ROUTES.osImportOsStatusRequestsLogs,
            _systemRoutes_1.SYSTEM_ROUTES.dashboard,
            _systemRoutes_1.SYSTEM_ROUTES.swagger,
            _systemRoutes_1.SYSTEM_ROUTES.health,
        ]);
        return express_winston_1.default.logger({
            winstonInstance: winston_1.default.createLogger({
                transports,
            }),
            format: winston_1.default.format.combine(),
            ignoreRoute: (req, res) => false,
            meta: true,
            requestWhitelist: [],
            responseWhitelist: [],
            dynamicMeta: (req, res) => {
                var _a, _b;
                try {
                    const request_headers = {
                        client_ip: req.headers['cf-connecting-ip'] ||
                            req.headers['x-original-forwarded-for'] ||
                            req.headers['x-forwarded-for'] ||
                            req.socket.remoteAddress || '',
                        'user-agent': req.headers['user-agent'] || '',
                        'content-type': req.headers['content-type'] || '',
                        origin: req.headers.origin || '',
                    };
                    if (req.headers.authorization) {
                        request_headers.authorization = req.headers.authorization;
                    }
                    if (req.headers['x-api-key']) {
                        request_headers['x-api-key'] = req.headers['x-api-key'];
                    }
                    const { errorCode, error } = core_1.RequestsLoggerHelper.getErrorPropsFromBody(res._body);
                    const { isSystem, openUserId } = core_1.RequestsLoggerHelper.getUserIdFromResRequest(res);
                    return {
                        date: new Date().toISOString(),
                        route_path: ((_a = req.route) === null || _a === void 0 ? void 0 : _a.path) || null,
                        response_status_code: res.statusCode,
                        response_time: res.responseTime,
                        service_key: _appConfig_1.APP_CONFIG_OS_CORE.serviceKey,
                        method: req.method,
                        error,
                        error_code: errorCode,
                        url: req.url,
                        open_user_id: openUserId,
                        is_system: isSystem,
                        request_headers: request_headers,
                        request_query: req.query || {},
                        request_body: req.body,
                        request_params: req.params || {},
                        response_body: res._body,
                    };
                }
                catch (error) {
                    return {
                        date: new Date().toISOString(),
                        error: 1,
                        error_code: 'error_log',
                        route_path: ((_b = req === null || req === void 0 ? void 0 : req.route) === null || _b === void 0 ? void 0 : _b.path) || null,
                        response_status_code: res.statusCode,
                        response_time: 0,
                        service_key: _appConfig_1.APP_CONFIG_OS_CORE.serviceKey,
                        method: '',
                        url: '',
                        open_user_id: null,
                        is_system: null,
                        request_headers: {},
                        request_query: {},
                        request_body: {},
                        request_params: {},
                        response_body: {},
                    };
                }
            },
            skip: (req) => {
                var _a;
                return ((_a = req === null || req === void 0 ? void 0 : req.route) === null || _a === void 0 ? void 0 : _a.path) in skipMap;
            },
        });
    }
    getSkipUrlsMapBySystemRoutes(systemRoutes) {
        if (!systemRoutes.length) {
            return {};
        }
        const skipUrls = {};
        for (const urls of systemRoutes) {
            for (const key in urls) {
                skipUrls[urls[key]] = true;
            }
        }
        return skipUrls;
    }
}
exports.RequestsLoggerInitializer = RequestsLoggerInitializer;
//# sourceMappingURL=RequestsLoggerInitializer.js.map