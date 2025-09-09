"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateRequestLogsService = void 0;
const fs_1 = __importDefault(require("fs"));
const core_1 = require("../../core");
const _logger_1 = require("../..");
class CreateRequestLogsService {
    addLogsToFile(logs) {
        const filePath = core_1.RequestsLoggerHelper.getFilePath();
        const str = logs.map(log => JSON.stringify(log)).join(',\n');
        fs_1.default.appendFile(filePath, `${str},`, (error) => {
            if (error) {
                _logger_1.appLogger.error('error save requests logs to file', error);
            }
        });
    }
}
exports.CreateRequestLogsService = CreateRequestLogsService;
//# sourceMappingURL=CreateRequestLogsService.js.map