"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.requestLoggerAppModule = void 0;
const _appModule_1 = require("../../appModule");
const core_1 = require("../core");
exports.requestLoggerAppModule = new _appModule_1.AppModule({
    controllers: [
        core_1.GetRequestsLogsController
    ]
});
//# sourceMappingURL=requestLoggerAppModule.js.map