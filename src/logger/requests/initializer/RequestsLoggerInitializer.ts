import * as Transport from 'winston-transport'
import winston from 'winston'
import expressWinston from 'express-winston'

import {APP_CONFIG_OS_CORE} from '@appConfig'

import {RequestsLoggerHelper, ServerMeta, ServerMetaRequestHeaders} from '@logger/core'
import {SYSTEM_ROUTES} from '@systemRoutes'
import {AppResponse} from '@appResponse'
import {AppRouterRequestHandler} from '@appRouter'


export class RequestsLoggerInitializer {
    
    public buildMiddleware(): AppRouterRequestHandler {
        
        const transports: Transport[] = [
            new winston.transports.File({
                level: 'info',
                filename: RequestsLoggerHelper.getFilePath(),
                format: winston.format.combine(
                    winston.format.timestamp(),
                    winston.format.printf((info: any) => {
                        if (info?.meta?.responseTime) {
                            delete info.meta.responseTime
                        }
                        return `${JSON.stringify(info.meta)},`
                    }),
                ),
            }),
        ]
        
        if (APP_CONFIG_OS_CORE.logger.hasRequestConsoleLogger) {
            transports.push(new winston.transports.Console({
                format: winston.format.combine(winston.format.splat(), winston.format.colorize(), winston.format.simple()),
            }))
        }
        
        const skipMap = this.getSkipUrlsMapBySystemRoutes([
            SYSTEM_ROUTES.osLogs,
            SYSTEM_ROUTES.osRequestsInfo,
            SYSTEM_ROUTES.osImportOsStatusRequestsLogs,
            SYSTEM_ROUTES.dashboard,
            SYSTEM_ROUTES.swagger,
            SYSTEM_ROUTES.health,
        ])
        
        return expressWinston.logger({
            winstonInstance: winston.createLogger({
                transports,
            }),
            format: winston.format.combine(),
            ignoreRoute: (req, res) => false,
            meta: true,
            requestWhitelist: [],
            responseWhitelist: [],
            dynamicMeta: (req, res: AppResponse): ServerMeta => {
                try {
                    const request_headers: ServerMetaRequestHeaders = {
                        client_ip: req.headers['cf-connecting-ip'] as string ||
                            req.headers['x-original-forwarded-for'] as string ||
                            req.headers['x-forwarded-for'] as string ||
                            req.socket.remoteAddress as string || '',
                        'user-agent': req.headers['user-agent'] || '',
                        'content-type': req.headers['content-type'] || '',
                        origin: req.headers.origin || '',
                    }
                    if (req.headers.authorization) {
                        request_headers.authorization = req.headers.authorization
                    }
                    if (req.headers['x-api-key']) {
                        request_headers['x-api-key'] = req.headers['x-api-key'] as string
                    }
                    const {errorCode, error} = RequestsLoggerHelper.getErrorPropsFromBody(res._body)
                    const {isSystem, openUserId} = RequestsLoggerHelper.getUserIdFromResRequest(res)
                    return {
                        date: new Date().toISOString() as any as Date,
                        route_path: req.route?.path || null,
                        response_status_code: res.statusCode,
                        response_time: res.responseTime as number,
                        service_key: APP_CONFIG_OS_CORE.serviceKey,
                        method: req.method,
                        error,
                        error_code: errorCode,
                        url: req.url,
                        open_user_id: openUserId,
                        is_system: isSystem,
                        request_headers: request_headers,
                        request_query: req.query as Record<string, string> || {},
                        request_body: req.body,
                        request_params: req.params || {},
                        response_body: res._body,
                    }
                } catch (error) {
                    return {
                        date: new Date().toISOString() as any as Date,
                        error: 1,
                        error_code: 'error_log',
                        route_path: req?.route?.path || null,
                        response_status_code: res.statusCode,
                        response_time: 0,
                        service_key: APP_CONFIG_OS_CORE.serviceKey,
                        method: '',
                        url: '',
                        open_user_id: null,
                        is_system: null,
                        request_headers: {} as ServerMetaRequestHeaders,
                        request_query: {},
                        request_body: {},
                        request_params: {},
                        response_body: {},
                    }
                }
            },
            skip: (req) => {
                return req?.route?.path in skipMap
            },
        }) as AppRouterRequestHandler
    }
    
    private getSkipUrlsMapBySystemRoutes(systemRoutes: Record<string, string>[]) {
        if (!systemRoutes.length) {
            return {}
        }
        const skipUrls: Record<string, boolean> = {}
        for (const urls of systemRoutes) {
            for (const key in urls) {
                skipUrls[urls[key]] = true
            }
        }
        return skipUrls
        
    }
}