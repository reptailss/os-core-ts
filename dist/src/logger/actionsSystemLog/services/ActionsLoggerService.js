"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ActionsLoggerService = void 0;
const _appConfig_1 = require("../../../appConfig");
const _helpers_1 = require("../../../helpers");
const _logger_1 = require("../..");
const _appError_1 = require("../../../appError");
class ActionsLoggerService {
    async logCreateAction({ value, openUserId, config, rowId, }) {
        return await this.sendActionSystemLog({
            database: config.database,
            dbType: config.dbType,
            table: config.tableName,
            after: value,
            action: 'ADD',
            openUserId,
            rowId,
        });
    }
    async logUpdateAction({ newValue, oldValue, openUserId, config, rowId, }) {
        return await this.sendActionSystemLog({
            database: config.database,
            dbType: config.dbType,
            table: config.tableName,
            after: oldValue,
            before: newValue,
            action: 'UPDATE',
            openUserId,
            rowId,
        });
    }
    async logDeleteAction({ oldValue, openUserId, config, rowId, }) {
        await this.sendActionSystemLog({
            database: config.database,
            dbType: config.dbType,
            table: config.tableName,
            before: oldValue,
            action: 'DELETE',
            openUserId,
            rowId,
        });
    }
    async sendActionSystemLog({ openUserId, database, dbType, table, after, action, before, rowId, }) {
        if (!_appConfig_1.APP_CONFIG_OS_CORE.logger.hasSendActionSystemLogger) {
            return;
        }
        if (!_appConfig_1.APP_CONFIG_OS_CORE.urls.actionsSystemLoggerServiceUrl) {
            throw new _appError_1.AppError('Not found actions system logger api url in env', {
                errorKey: 'SERVER_SIDE_ERROR',
            });
        }
        try {
            const { transformAfter, transformBefore, } = this.buildAfterAndBeforeData({
                after,
                action,
                before,
            });
            if (!Object.keys(transformAfter).length &&
                !Object.keys(transformBefore).length) {
                return;
            }
            await _helpers_1.SystemRequestHelper.post({
                url: _appConfig_1.APP_CONFIG_OS_CORE.urls.actionsSystemLoggerServiceUrl + _helpers_1.SystemEndpointsHelper.buildSystemEndpointUrl('/system-logs/add'),
                body: JSON.stringify({
                    service_key: _appConfig_1.APP_CONFIG_OS_CORE.serviceKey,
                    database,
                    db_type: dbType,
                    table,
                    action,
                    open_user_id: openUserId,
                    before: transformBefore,
                    after: transformAfter,
                    row_id: String(rowId),
                }),
                serviceKey: 'actions-logger',
                headers: {
                    'content-type': 'application/json',
                },
            });
        }
        catch (error) {
            _logger_1.appLogger.error('os-core:Error send api system log', error);
        }
    }
    buildAfterAndBeforeData({ after, before, action, }) {
        if (action === 'ADD') {
            return {
                transformBefore: {},
                transformAfter: after || {},
            };
        }
        if (action === 'DELETE') {
            return {
                transformBefore: before || {},
                transformAfter: {},
            };
        }
        if (!before) {
            return {
                transformBefore: {},
                transformAfter: after || {},
            };
        }
        if (!after) {
            return {
                transformBefore: before || {},
                transformAfter: {},
            };
        }
        const transformBefore = {};
        const transformAfter = {};
        for (const key in after) {
            if (key === 'date_update' ||
                key === 'date_add') {
                continue;
            }
            if (!this.checkHasChange(before[key], after[key])) {
                continue;
            }
            transformBefore[key] = before[key];
            transformAfter[key] = after[key];
        }
        return {
            transformBefore,
            transformAfter,
        };
    }
    checkHasChange(before, after) {
        if (typeof after === 'object') {
            try {
                return JSON.stringify(before) !== JSON.stringify(after);
            }
            catch (error) {
                return true;
            }
        }
        return before !== after;
    }
}
exports.ActionsLoggerService = ActionsLoggerService;
//# sourceMappingURL=ActionsLoggerService.js.map