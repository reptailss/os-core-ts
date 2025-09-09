"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SystemRequestHelper = void 0;
const _auth_1 = require("../../auth");
const _appConfig_1 = require("../../appConfig");
const _appError_1 = require("../../appError");
const _logger_1 = require("../../logger");
class SystemRequestHelper {
    static get({ url, headers, params, serviceKey, }) {
        return this.systemRequestHelper({
            url,
            headers: this.buildHeadersWithSystemToken(headers),
            method: 'GET',
            params,
            serviceKey,
        });
    }
    static post({ url, headers, body, params, serviceKey, }) {
        return this.systemRequestHelper({
            url,
            headers: this.buildHeadersWithSystemToken(headers),
            body,
            method: 'POST',
            params,
            serviceKey,
        });
    }
    static put({ url, headers, body, params, serviceKey, }) {
        return this.systemRequestHelper({
            url,
            headers: this.buildHeadersWithSystemToken(headers),
            body,
            method: 'PUT',
            params,
            serviceKey,
        });
    }
    static delete({ url, headers, params, serviceKey, }) {
        return this.systemRequestHelper({
            url,
            headers: this.buildHeadersWithSystemToken(headers),
            method: 'DELETE',
            params,
            serviceKey,
        });
    }
    static async systemRequestHelper(props) {
        var _a;
        let response;
        try {
            response = await fetch(props.params ? `${props.url}?${this.serializeUrlParams(props.params)}` : props.url, {
                method: props.method || 'GET',
                headers: props.headers || {},
                body: props.body,
            });
        }
        catch (error) {
            throw new _appError_1.AppError(`External request failed. ${props.method || 'GET'} Url:${props.url}`, {
                errorKey: 'EXTERNAL_REQUEST_FAILED_ERROR',
            });
        }
        const data = await this.parseResponse(response, props);
        if (!response.ok) {
            if (_appError_1.AppErrorHelper.checkIsErrorResult(data)) {
                if (((_a = data.errors) === null || _a === void 0 ? void 0 : _a.length) > 0) {
                    _logger_1.appLogger.error(`${props.serviceKey} errors:${JSON.stringify(data.errors)}`);
                }
                throw new _appError_1.AppError(`Error system request:'${props.serviceKey}'. Error code:${data.error_code}`, {
                    errors: data.errors,
                    statusCode: data.status,
                    errorCode: data.error_code,
                });
            }
            throw new _appError_1.AppError(`External request failed. ${props.method || 'GET'} Url:${props.url}`, {
                errorKey: 'EXTERNAL_REQUEST_FAILED_ERROR',
                statusCode: response.status,
            });
        }
        return data;
    }
    static async parseResponse(response, props) {
        try {
            const contentType = response.headers.get('Content-Type');
            if (!contentType ||
                !contentType.includes('application/json')) {
                return await response.text();
            }
            return await response.json();
        }
        catch (error) {
            throw new _appError_1.AppError(`External request failed. ${props.method || 'GET'} Url:${props.url}`, {
                errorKey: 'EXTERNAL_REQUEST_FAILED_ERROR',
            });
        }
    }
    static buildHeadersWithSystemToken(headers) {
        if (!headers) {
            return _auth_1.AuthHelper.buildAuthHeaders(_appConfig_1.APP_CONFIG_OS_CORE.tokens.systemAuthToken);
        }
        return Object.assign(Object.assign({}, headers), _auth_1.AuthHelper.buildAuthHeaders(_appConfig_1.APP_CONFIG_OS_CORE.tokens.systemAuthToken));
    }
    static serializeUrlParams(obj, prefix) {
        let str = [];
        let p;
        for (p in obj) {
            if (obj && obj.hasOwnProperty(p)) {
                let k = prefix ? prefix + '[' + p + ']' : p;
                let v = obj[p];
                if (typeof v === 'string' || typeof v === 'number' || typeof v === 'boolean') {
                    str.push(encodeURIComponent(k) + '=' + encodeURIComponent(v));
                }
                else if (v !== null && typeof v === 'object') {
                    str.push(this.serializeUrlParams(v, k));
                }
            }
        }
        return str.join('&');
    }
}
exports.SystemRequestHelper = SystemRequestHelper;
//# sourceMappingURL=SystemRequestHelper.js.map