"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ImportOsStatusRequestLogsService = void 0;
const _appConfig_1 = require("../../../appConfig");
const _logger_1 = require("../..");
const core_1 = require("../../core");
const _helpers_1 = require("../../../helpers");
class ImportOsStatusRequestLogsService {
    constructor(getRequestsLogsService = new core_1.GetRequestsLogsService(), clearRequestsLogsService = new core_1.ClearRequestsLogsService(), createRequestLogsService = new core_1.CreateRequestLogsService()) {
        this.getRequestsLogsService = getRequestsLogsService;
        this.clearRequestsLogsService = clearRequestsLogsService;
        this.createRequestLogsService = createRequestLogsService;
        this.BATCH_SIZE = 150;
    }
    async import() {
        if (!_appConfig_1.APP_CONFIG_OS_CORE.urls.osStatusServiceUrl) {
            _logger_1.appLogger.error('Not found os status api url in env');
            return {
                count: 0,
                importCount: 0,
            };
        }
        try {
            const logs = this.getRequestsLogsService.getSyncRequests();
            if (!(logs === null || logs === void 0 ? void 0 : logs.length)) {
                return {
                    count: 0,
                    importCount: 0,
                };
            }
            this.clearRequestsLogsService.clearRequests();
            let totalImportCount = 0;
            let totalCount = 0;
            const errorImportData = [];
            for (let i = 0; i < logs.length; i += this.BATCH_SIZE) {
                const batch = logs.slice(i, i + this.BATCH_SIZE);
                totalCount += batch.length;
                try {
                    const response = await this.importLogs(batch);
                    if (typeof (response === null || response === void 0 ? void 0 : response.count) !== 'number') {
                        continue;
                    }
                    totalImportCount += response === null || response === void 0 ? void 0 : response.import_count;
                    _logger_1.appLogger.info(`Success import requests ${response.import_count}`);
                }
                catch (error) {
                    errorImportData.push(batch);
                    _logger_1.appLogger.error(`Failed to import requests`, error);
                }
            }
            if (errorImportData.length >= 1) {
                this.saveLogsToFile(errorImportData);
            }
            return {
                count: totalCount,
                importCount: totalImportCount,
            };
        }
        catch (error) {
            _logger_1.appLogger.error('error import os status logs', error);
            return {
                count: 0,
                importCount: 0,
            };
        }
    }
    async importLogs(requestLogs) {
        return await _helpers_1.SystemRequestHelper.post({
            url: _appConfig_1.APP_CONFIG_OS_CORE.urls.osStatusServiceUrl + _helpers_1.SystemEndpointsHelper.buildSystemEndpointUrl('/request-logs/import'),
            body: JSON.stringify({
                request_logs: requestLogs,
            }),
            headers: {
                'content-type': 'application/json',
            },
            serviceKey: 'os-status',
        });
    }
    saveLogsToFile(logsList) {
        for (const logs of logsList) {
            this.createRequestLogsService.addLogsToFile(logs);
        }
    }
}
exports.ImportOsStatusRequestLogsService = ImportOsStatusRequestLogsService;
//# sourceMappingURL=ImportOsStatusRequestLogs.js.map