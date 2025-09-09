"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PtpAdminChecker = void 0;
const _services_1 = require("../../../services");
const _appError_1 = require("../../../appError");
const _logger_1 = require("../../../logger");
class PtpAdminChecker {
    static async coreOrClient({ openUserId, domain, }) {
        try {
            const roles = await _services_1.OsCorePtpCoreUsersService.getRoles(openUserId);
            if (roles.isAdmin) {
                return 'ptp-core';
            }
        }
        catch (error) {
            _logger_1.appLogger.error('error check role ptp client users', error);
        }
        const roles = await _services_1.OsCorePtpClientUsersService.getRoles({
            domain,
            openUserId,
        });
        if (!roles.isAdmin) {
            throw new _appError_1.AppError('User must be an admin of ptp core or ptp client', {
                errorKey: 'UNAUTHORIZED_ERROR',
            });
        }
        return 'ptp-client';
    }
    static async coreOrClientAndDomainIfNotCore({ openUserId, domain, apiSecretKey, apiAccessKey, }) {
        const adminType = await this.coreOrClient({
            openUserId,
            domain,
        });
        const group = await _services_1.OsCorePtpCoreGroupsService.getGroupByApiKeys({
            apiAccessKey,
            apiSecretKey,
        });
        if (!group) {
            throw new _appError_1.AppError('Not found group by api keys', {
                errorKey: 'NOT_FOUND_ERROR',
            });
        }
        if (adminType === 'ptp-core') {
            return {
                ptpGroupId: group.id,
                ptpGroupCityId: group.city_id,
            };
        }
        if (!group.domain || group.domain !== domain) {
            throw new _appError_1.AppError('Access denied for domain', {
                errorKey: 'UNAUTHORIZED_ERROR',
            });
        }
        return {
            ptpGroupId: group.id,
            ptpGroupCityId: group.city_id,
        };
    }
}
exports.PtpAdminChecker = PtpAdminChecker;
//# sourceMappingURL=PtpAdminChecker.js.map