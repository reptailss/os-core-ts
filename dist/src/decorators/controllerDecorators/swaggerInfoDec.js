"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SwaggerInfoDec = void 0;
const _appConfig_1 = require("../../appConfig");
const core_1 = require("../core");
function SwaggerInfoDec(baseInfo) {
    return function (target, _propertyKey, descriptor) {
        if (!_appConfig_1.APP_CONFIG_OS_CORE.swagger.hasSwagger) {
            return;
        }
        core_1.ControllerDecoratorsBuilder.addSwaggerInfoToMethod({
            target,
            _propertyKey,
            baseInfo,
        });
    };
}
exports.SwaggerInfoDec = SwaggerInfoDec;
//# sourceMappingURL=swaggerInfoDec.js.map