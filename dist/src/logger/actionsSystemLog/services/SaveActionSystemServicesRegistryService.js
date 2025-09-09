"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SaveActionSystemServicesRegistryService = void 0;
const _appConfig_1 = require("../../../appConfig");
const _logger_1 = require("../..");
const _helpers_1 = require("../../../helpers");
class SaveActionSystemServicesRegistryService {
    static async saveServicesRegistry({ serviceKey }) {
        if (!_appConfig_1.APP_CONFIG_OS_CORE.urls.actionsSystemLoggerServiceUrl) {
            _logger_1.appLogger.error('Not found actions logger api url in env');
            return;
        }
        try {
            await _helpers_1.SystemRequestHelper.post({
                url: _appConfig_1.APP_CONFIG_OS_CORE.urls.actionsSystemLoggerServiceUrl + _helpers_1.SystemEndpointsHelper.buildSystemEndpointUrl('/services/save'),
                serviceKey: 'actions-logger',
                headers: {
                    'Content-type': 'application/json',
                },
                body: JSON.stringify({
                    service_key: serviceKey,
                }),
            });
        }
        catch (error) {
            _logger_1.appLogger.error('error save service key to actions-logger service', error);
        }
    }
}
exports.SaveActionSystemServicesRegistryService = SaveActionSystemServicesRegistryService;
//# sourceMappingURL=SaveActionSystemServicesRegistryService.js.map