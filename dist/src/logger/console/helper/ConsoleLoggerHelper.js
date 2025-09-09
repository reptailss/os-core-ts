"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.ConsoleLoggerHelper = void 0;
const path_1 = __importDefault(require("path"));
const FILE_NAME = `%DATE%.log`;
const DATE_PATTERN = 'YYYY-MM-DD';
class ConsoleLoggerHelper {
    static getFileNameByDate({ year, month, day, }) {
        return FILE_NAME.replace(/%DATE%/g, `${year}-${month}-${day}`);
    }
    static getFileName() {
        return FILE_NAME;
    }
    static getDatePattern() {
        return DATE_PATTERN;
    }
}
exports.ConsoleLoggerHelper = ConsoleLoggerHelper;
_a = ConsoleLoggerHelper;
ConsoleLoggerHelper.getFilePath = (props) => {
    const dirPath = _a.getDirPath();
    const fileName = _a.getFileNameByDate(props);
    return path_1.default.join(dirPath, fileName);
};
ConsoleLoggerHelper.getDirPath = () => {
    const logDir = process.cwd();
    return path_1.default.join(logDir, 'logs', 'console');
};
//# sourceMappingURL=ConsoleLoggerHelper.js.map