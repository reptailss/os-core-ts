"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ImportStructureServiceEndpointsByAppModulesService = void 0;
const _appConfig_1 = require("../../appConfig");
const core_1 = require("../core");
class ImportStructureServiceEndpointsByAppModulesService {
    async importByAppModules(appModules, type) {
        var _a;
        const endpoints = [];
        for (const appModule of appModules) {
            if ((_a = appModule.controllers) === null || _a === void 0 ? void 0 : _a.length) {
                const endpoints = this.getImportStructureServicesEndpointsByAppModule(appModule);
                if (endpoints.length) {
                    endpoints.push(...endpoints);
                }
            }
        }
        if (!endpoints.length) {
            return;
        }
        await core_1.ImportStructureServicesService.importServices({
            service_key: _appConfig_1.APP_CONFIG_OS_CORE.serviceKey,
            endpoints,
            type,
        });
    }
    getImportStructureServicesEndpointsByAppModule(appModule) {
        var _a, _b;
        const res = [];
        if ((_a = appModule.appModules) === null || _a === void 0 ? void 0 : _a.length) {
            appModule.appModules.forEach((childAppModule) => {
                const childRes = this.getImportStructureServicesEndpointsByAppModule(childAppModule);
                if (childRes === null || childRes === void 0 ? void 0 : childRes.length) {
                    res.push(...childRes);
                }
            });
        }
        if ((_b = appModule.controllers) === null || _b === void 0 ? void 0 : _b.length) {
            appModule.controllers.forEach(controller => {
                var _a;
                if (!((_a = controller === null || controller === void 0 ? void 0 : controller.endpoints) === null || _a === void 0 ? void 0 : _a.length)) {
                    return;
                }
                controller.endpoints.forEach(endpoint => {
                    if (!controller.importStructureServiceEndpoints ||
                        !(endpoint._propertyKey in controller.importStructureServiceEndpoints)) {
                        return;
                    }
                    const data = controller.importStructureServiceEndpoints[endpoint._propertyKey];
                    res.push({
                        name: (data === null || data === void 0 ? void 0 : data.name) || '',
                        key: (data === null || data === void 0 ? void 0 : data.key) || endpoint.path,
                    });
                });
            });
        }
        return res;
    }
}
exports.ImportStructureServiceEndpointsByAppModulesService = ImportStructureServiceEndpointsByAppModulesService;
//# sourceMappingURL=ImportStructureServiceEndpointsByAppModulesService.js.map