"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ClearRequestsLogsService = void 0;
const fs_1 = __importDefault(require("fs"));
const core_1 = require("../../core");
const _logger_1 = require("../..");
class ClearRequestsLogsService {
    clearRequests() {
        const filePath = core_1.RequestsLoggerHelper.getFilePath();
        fs_1.default.access(filePath, fs_1.default.constants.F_OK, (error) => {
            if (error) {
                _logger_1.appLogger.error(error);
                return;
            }
            fs_1.default.truncate(filePath, 0, (truncateErr) => {
                if (truncateErr) {
                    _logger_1.appLogger.error(truncateErr);
                }
            });
        });
    }
    ;
}
exports.ClearRequestsLogsService = ClearRequestsLogsService;
//# sourceMappingURL=ClearRequestsLogsService.js.map