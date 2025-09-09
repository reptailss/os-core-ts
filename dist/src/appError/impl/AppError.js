"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppError = void 0;
const _appError_1 = require("..");
class AppError extends Error {
    constructor(message, { statusCode, errorCode, errors, errorKey, } = {}) {
        super(message);
        const errorProps = _appError_1.AppErrorHelper.getAppErrorCodeAndStatus({
            statusCode,
            errorCode,
            errorKey,
        });
        this.statusCode = errorProps.statusCode;
        this.errorCode = errorProps.errorCode;
        this.isOperational = true;
        if (errorKey) {
            this.errorKey = errorKey;
        }
        if (errors) {
            this.errors = errors;
        }
        Error.captureStackTrace(this, this.constructor);
    }
}
exports.AppError = AppError;
//# sourceMappingURL=AppError.js.map