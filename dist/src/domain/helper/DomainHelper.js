"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DomainHelper = void 0;
const _appError_1 = require("../../appError");
class DomainHelper {
    static getDomainFromReq(request) {
        var _a, _b, _c, _d;
        const origin = ((_a = request.headers) === null || _a === void 0 ? void 0 : _a.domain) || ((_b = request.headers) === null || _b === void 0 ? void 0 : _b.origin) || ((_c = request.headers) === null || _c === void 0 ? void 0 : _c.host) || ((_d = request.headers) === null || _d === void 0 ? void 0 : _d.referer);
        if (typeof origin !== 'string') {
            throw new _appError_1.AppError('os-core:Domain not found in headers', {
                errorKey: 'HEADER_VALIDATION_ERROR',
            });
        }
        const originArray = origin.split('//');
        if (!(originArray === null || originArray === void 0 ? void 0 : originArray.length)) {
            throw new _appError_1.AppError('os-core:Domain not valid', {
                errorKey: 'HEADER_VALIDATION_ERROR',
            });
        }
        return originArray[(originArray === null || originArray === void 0 ? void 0 : originArray.length) - 1].replace(/\//g, '');
    }
}
exports.DomainHelper = DomainHelper;
//# sourceMappingURL=DomainHelper.js.map