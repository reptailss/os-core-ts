"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RequestHelper = void 0;
const _appError_1 = require("../../appError");
const _logger_1 = require("../../logger");
class RequestHelper {
    static get({ url, headers, params, }) {
        return this.requestHelper({
            url,
            headers,
            method: 'GET',
            params,
        });
    }
    static post({ url, headers, body, params, }) {
        return this.requestHelper({
            url,
            headers,
            body,
            method: 'POST',
            params,
        });
    }
    static put({ url, headers, body, params, }) {
        return this.requestHelper({
            url,
            headers,
            body,
            method: 'PUT',
            params,
        });
    }
    static delete({ url, headers, body, params, }) {
        return this.requestHelper({
            url,
            headers,
            body,
            method: 'DELETE',
            params,
        });
    }
    static async requestHelper(props) {
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
            _logger_1.appLogger.error(...this.buildLoggerReqMessage(props));
            if (typeof data === 'object') {
                _logger_1.appLogger.error(JSON.stringify(data));
            }
            else {
                _logger_1.appLogger.error(data);
            }
            throw new _appError_1.AppError(`External request failed. ${props.method || 'GET'} Url:${props.url}`, {
                errorCode: (data === null || data === void 0 ? void 0 : data.error_code) || 'external_request_failed_error',
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
    static buildLoggerReqMessage(props) {
        const res = [
            `Request failed ${props.method || 'GET'} url:${props.url}`,
        ];
        if (props.params) {
            res.push(`Request params:${JSON.stringify(props.params)}`);
        }
        return res;
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
exports.RequestHelper = RequestHelper;
//# sourceMappingURL=RequestHelper.js.map