"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.consoleLoggerAppModule = void 0;
const _appModule_1 = require("../../../appModule");
const core_1 = require("../../core");
exports.consoleLoggerAppModule = new _appModule_1.AppModule({
    controllers: [
        core_1.GetConsoleLogsController,
    ]
});
//# sourceMappingURL=consoleLoggerAppModule.js.map