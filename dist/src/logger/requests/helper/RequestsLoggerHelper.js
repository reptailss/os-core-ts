"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RequestsLoggerHelper = exports.FILE_NAME = void 0;
const path_1 = __importDefault(require("path"));
exports.FILE_NAME = `info.log`;
class RequestsLoggerHelper {
    static getDirPath() {
        const logDir = process.cwd();
        return path_1.default.join(logDir, 'logs', 'requests');
    }
    static getFilePath() {
        const dirPath = this.getDirPath();
        return path_1.default.join(dirPath, exports.FILE_NAME);
    }
    static getErrorPropsFromBody(body) {
        if (!body || typeof body !== 'object') {
            return {
                error: 0,
                errorCode: null,
            };
        }
        if (!('error' in body)) {
            return {
                error: 0,
                errorCode: null,
            };
        }
        return {
            error: body.error ? 1 : 0,
            errorCode: 'error_code' in body ? body.error_code : null,
        };
    }
    static getUserIdFromResRequest(res) {
        if (!('user' in res.locals) || !res.locals.user.open_user_id) {
            return {
                openUserId: null,
                isSystem: 0,
            };
        }
        return {
            openUserId: res.locals.user.open_user_id,
            isSystem: typeof res.locals.user.is_system !== 'undefined' ? res.locals.user.is_system ? 0 : 1 : null,
        };
    }
}
exports.RequestsLoggerHelper = RequestsLoggerHelper;
//# sourceMappingURL=RequestsLoggerHelper.js.map