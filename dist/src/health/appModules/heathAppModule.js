"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.healthAppModule = void 0;
const core_1 = require("../core");
const _appModule_1 = require("../../appModule");
exports.healthAppModule = new _appModule_1.AppModule({
    controllers: [
        core_1.HealthController,
    ],
});
//# sourceMappingURL=heathAppModule.js.map