"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ImportOsStatusInfoLogsService = void 0;
const _logger_1 = require("../..");
const core_1 = require("../../core");
const _appConfig_1 = require("../../../appConfig");
const _appError_1 = require("../../../appError");
const _helpers_1 = require("../../../helpers");
let osStatusOsInfo = [];
class ImportOsStatusInfoLogsService {
    constructor(getOsStatusOsInfoService = new core_1.GetOsStatusOsInfoService()) {
        this.getOsStatusOsInfoService = getOsStatusOsInfoService;
    }
    async saveAndImport() {
        try {
            const info = await this.getOsStatusOsInfoService.getOsInfo();
            osStatusOsInfo.push(info);
            if (osStatusOsInfo.length < 20) {
                return;
            }
            await this.import();
        }
        catch (error) {
            _logger_1.appLogger.error(`Error get os-info`, error);
        }
    }
    async import() {
        try {
            await this.importLogs(osStatusOsInfo);
            osStatusOsInfo = [];
        }
        catch (error) {
            _logger_1.appLogger.error(`Failed to import os-info`, error);
        }
    }
    async importLogs(osInfoLogs) {
        if (!_appConfig_1.APP_CONFIG_OS_CORE.urls.osStatusServiceUrl) {
            throw new _appError_1.AppError('Not found os status api url in env', {
                errorKey: 'SERVER_SIDE_ERROR',
            });
        }
        return await _helpers_1.SystemRequestHelper.post({
            url: _appConfig_1.APP_CONFIG_OS_CORE.urls.osStatusServiceUrl + _helpers_1.SystemEndpointsHelper.buildSystemEndpointUrl('/os-info-logs/import'),
            body: JSON.stringify({
                os_info_logs: osInfoLogs,
            }),
            headers: {
                'content-type': 'application/json',
            },
            serviceKey: 'os-status',
        });
    }
}
exports.ImportOsStatusInfoLogsService = ImportOsStatusInfoLogsService;
//# sourceMappingURL=ImportOsStatusInfoLogs.js.map