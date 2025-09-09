"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SaveOsStatusServicesRegistryService = void 0;
const _appConfig_1 = require("../../../appConfig");
const _logger_1 = require("../..");
const _helpers_1 = require("../../../helpers");
class SaveOsStatusServicesRegistryService {
    static async saveServicesRegistry({ serviceKey, endpoints }) {
        if (!_appConfig_1.APP_CONFIG_OS_CORE.urls.osStatusServiceUrl) {
            _logger_1.appLogger.error('Not found os status api url in env');
            return;
        }
        try {
            await _helpers_1.SystemRequestHelper.post({
                url: _appConfig_1.APP_CONFIG_OS_CORE.urls.osStatusServiceUrl + _helpers_1.SystemEndpointsHelper.buildSystemEndpointUrl('/services/save'),
                serviceKey: 'os-status',
                headers: {
                    'content-type': 'application/json',
                },
                body: JSON.stringify({
                    service_key: serviceKey,
                    endpoints,
                }),
            });
        }
        catch (error) {
            _logger_1.appLogger.error('error save api os status logs', error);
        }
    }
}
exports.SaveOsStatusServicesRegistryService = SaveOsStatusServicesRegistryService;
//# sourceMappingURL=SaveOsStatusServicesRegistryService.js.map