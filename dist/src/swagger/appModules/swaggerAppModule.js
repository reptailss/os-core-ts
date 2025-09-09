"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.swaggerAppModule = void 0;
const _appModule_1 = require("../../appModule");
const core_1 = require("../core");
exports.swaggerAppModule = new _appModule_1.AppModule({
    controllers: [
        core_1.SwaggerController,
    ],
});
//# sourceMappingURL=swaggerAppModule.js.map