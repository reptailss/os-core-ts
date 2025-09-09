"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthHelper = void 0;
const _appError_1 = require("../../appError");
class AuthHelper {
    static getTokenFromReq(req) {
        var _a, _b;
        if (!((_a = req.headers) === null || _a === void 0 ? void 0 : _a.authorization)) {
            throw new _appError_1.AppError('os-core:Token not found in headers', {
                errorKey: 'HEADER_VALIDATION_ERROR',
            });
        }
        return (_b = req.headers) === null || _b === void 0 ? void 0 : _b.authorization;
    }
    static buildAuthHeaders(authToken) {
        return {
            authorization: authToken,
        };
    }
}
exports.AuthHelper = AuthHelper;
//# sourceMappingURL=AuthHelper.js.map