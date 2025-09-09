"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ImportStructureServicesService = void 0;
const _appConfig_1 = require("../../appConfig");
const _appError_1 = require("../../appError");
const _helpers_1 = require("../../helpers");
class ImportStructureServicesService {
    static async importServices({ service_key, endpoints, type, }) {
        if (!_appConfig_1.APP_CONFIG_OS_CORE.urls.structureAccessServiceUrl) {
            throw new _appError_1.AppError('Not found structure access api url url in env', {
                errorKey: 'SERVER_SIDE_ERROR',
            });
        }
        return await _helpers_1.SystemRequestHelper.post({
            url: _appConfig_1.APP_CONFIG_OS_CORE.urls.structureAccessServiceUrl + _helpers_1.SystemEndpointsHelper.buildSystemEndpointUrl('/global-service-endpoints/import'),
            serviceKey: 'structure',
            body: JSON.stringify({
                service_key,
                endpoints,
                type,
            }),
            headers: {
                'content-type': 'application/json',
            },
        });
    }
}
exports.ImportStructureServicesService = ImportStructureServicesService;
//# sourceMappingURL=ImportStructureServices.js.map