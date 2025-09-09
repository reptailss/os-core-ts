"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.osStatusLoggerAppModule = void 0;
const _appModule_1 = require("../../../appModule");
const core_1 = require("../../core");
exports.osStatusLoggerAppModule = new _appModule_1.AppModule({
    controllers: [
        core_1.ImportOsStatusRequestsLogsController
    ]
});
//# sourceMappingURL=osStatusLoggerAppModule.js.map