"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StructureAccessService = void 0;
const _appConfig_1 = require("../../../appConfig");
const _appError_1 = require("../../../appError");
class StructureAccessService {
    static async checkAccess(options) {
        const res = await this.getStructureResponse({
            openUserId: options.openUserId,
            service: options.service,
            endpoint: options.endpoint,
            legalEntityId: options.legalEntityId,
        });
        if (res.has_access) {
            return;
        }
        throw new _appError_1.AppError('Access denied! Not found access to this endpoint', {
            errorKey: 'STRUCTURE_ACCESS_ERROR',
        });
    }
    static async checkAccessByPluginApiKey(options) {
        if (!_appConfig_1.APP_CONFIG_OS_CORE.structure.useStructureAccess) {
            return;
        }
        const res = await this.getStructureResponse({
            pluginApiKey: options.pluginApiKey,
            service: options.service || _appConfig_1.APP_CONFIG_OS_CORE.serviceKey,
            legalEntityId: options.legalEntityId,
            endpoint: options.endpoint,
        });
        if (res === null || res === void 0 ? void 0 : res.has_access) {
            return;
        }
        throw new _appError_1.AppError('Access denied! Not found access to this endpoint', {
            errorKey: 'STRUCTURE_ACCESS_ERROR',
        });
    }
    static async checkAccessByPluginApiKeyOrUserId(props) {
        const res = await this.getStructureResponse(props);
        if (res === null || res === void 0 ? void 0 : res.has_access) {
            return;
        }
        throw new _appError_1.AppError('Access denied! Not found access to this endpoint', {
            errorKey: 'STRUCTURE_ACCESS_ERROR',
        });
    }
    static async getStructureResponse(props) {
        return {
            has_access: true,
        };
        // if (!APP_CONFIG_OS_CORE.structure.useStructureAccess) {
        //     return {
        //         has_access: true,
        //     }
        // }
        // if (!APP_CONFIG_OS_CORE.urls.structureAccessServiceUrl) {
        //     throw new AppError('Not found structure access api url in env', {
        //         errorKey: 'SERVER_SIDE_ERROR',
        //     })
        // }
        //
        // try {
        //     return RequestHelper.get({
        //         url: APP_CONFIG_OS_CORE.urls.structureAccessServiceUrl + '/structure/access/check',
        //         params: {
        //             legal_entity_id: props.legalEntityId,
        //             service: props.service || APP_CONFIG_OS_CORE.serviceKey,
        //             endpoint: props.endpoint,
        //             ...(props?.openUserId ? {open_user_id: props.openUserId} : {}),
        //         },
        //         ...(props?.pluginApiKey ? {
        //             headers: {
        //                 plugin_api_key: props.pluginApiKey,
        //             },
        //         } : {}),
        //     })
        // } catch (error) {
        //     appLogger.error('error get structure access response', error)
        //     throw new AppError('error get structure access response', {
        //         errorKey: 'STRUCTURE_ACCESS_ERROR',
        //     })
        // }
    }
}
exports.StructureAccessService = StructureAccessService;
//# sourceMappingURL=StructureAccessService.js.map