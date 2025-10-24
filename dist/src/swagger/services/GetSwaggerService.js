"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetSwaggerService = void 0;
const core_1 = require("../core");
const _appConfig_1 = require("../../appConfig");
class GetSwaggerService {
    constructor() {
        this.getSwaggerTSService = new core_1.GetSwaggerTSService();
        this.swaggerPathsBuilder = new core_1.SwaggerPathsBuilder();
        this.swaggerConfigBuilder = new core_1.SwaggerConfigBuilder();
    }
    async getSwagger() {
        const swaggerConfig = this.swaggerConfigBuilder.getFromBuildFile();
        const { host, schemes, url, } = core_1.SwaggerHelper.getSwaggerUrlProps();
        const tsSchemas = this.getSwaggerTSService.getFromFile();
        return Object.assign(Object.assign({ swagger: '2.0', info: {
                title: (swaggerConfig === null || swaggerConfig === void 0 ? void 0 : swaggerConfig.title) || 'Swagger',
                description: (swaggerConfig === null || swaggerConfig === void 0 ? void 0 : swaggerConfig.description) || 'Swagger',
                version: '1.0.0',
            }, host,
            schemes, externalDocs: {
                url,
            }, paths: this.swaggerPathsBuilder.getPathsByTSSchemas(tsSchemas) }, ((swaggerConfig === null || swaggerConfig === void 0 ? void 0 : swaggerConfig.hasAuth) !== false ? core_1.SwaggerHelper.buildAuthSwagger() : {})), { definitions: tsSchemas, defaultAuthToken: _appConfig_1.APP_CONFIG_OS_CORE.swagger.defaultAuthToken });
    }
}
exports.GetSwaggerService = GetSwaggerService;
//# sourceMappingURL=GetSwaggerService.js.map