"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.appLogger = exports._initAppLogger = void 0;
const core_1 = require("../../core");
let _logger;
function _initAppLogger() {
    _logger = new core_1.ConsoleLoggerInitializer().getInstance();
}
exports._initAppLogger = _initAppLogger;
class AppLogger {
    error(...args) {
        if (!_logger) {
            console.error(...args);
            return;
        }
        if (!(args === null || args === void 0 ? void 0 : args.length)) {
            return;
        }
        args.forEach((arg) => {
            if (arg instanceof Error) {
                _logger.error({
                    message: arg.message,
                    stack: arg.stack,
                });
            }
            else {
                _logger.error(arg);
            }
        });
    }
    info(...args) {
        if (!_logger) {
            console.log(...args);
            return;
        }
        _logger.info(args);
    }
}
exports.appLogger = new AppLogger();
//# sourceMappingURL=appLogger.js.map