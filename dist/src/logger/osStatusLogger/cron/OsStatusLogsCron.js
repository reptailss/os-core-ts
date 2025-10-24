"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OsStatusLogsCron = void 0;
const _cron_1 = require("../../../cron");
const core_1 = require("../../core");
const _appConfig_1 = require("../../../appConfig");
const _logger_1 = require("../..");
class OsStatusLogsCron {
    constructor() {
        this.importOsStatusRequestLogsService = new core_1.ImportOsStatusRequestLogsService();
        this.importOsStatusInfoLogsService = new core_1.ImportOsStatusInfoLogsService();
        this.importOsStatusRequestLogsJob = new _cron_1.CronJob({
            cronTime: '*/30 * * * *',
            onTick: async () => {
                await this.importOsStatusRequestLogsService.import();
            },
            start: false,
        });
        this.importOsStatusInfoLogsJob = new _cron_1.CronJob({
            cronTime: '*/15 * * * * *',
            onTick: async () => {
                await this.importOsStatusInfoLogsService.saveAndImport();
            },
            start: false,
        });
    }
    start() {
        if (!_appConfig_1.APP_CONFIG_OS_CORE.logger.hasSendOsStatusLogs) {
            return;
        }
        this.importOsStatusRequestLogsJob.start();
        this.importOsStatusInfoLogsJob.start();
        _logger_1.appLogger.info('Success start os status import job');
    }
    stop() {
        this.importOsStatusRequestLogsJob.stop();
        this.importOsStatusInfoLogsJob.stop();
    }
}
exports.OsStatusLogsCron = OsStatusLogsCron;
//# sourceMappingURL=OsStatusLogsCron.js.map