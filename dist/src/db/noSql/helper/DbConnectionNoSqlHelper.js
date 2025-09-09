"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DbConnectionNoSqlHelper = void 0;
const _appConfig_1 = require("../../../appConfig");
class DbConnectionNoSqlHelper {
    static getDbUrl(options) {
        let url = ``;
        if (String(options.protocol || '').trim() !== '') {
            url += options.protocol;
            if (String(options.user || '').trim() !== '') {
                url += options.user;
                if (String(options.password || '').trim() !== '') {
                    url += ':' + options.password;
                }
                url += '@';
            }
            if (String(options.host || '').trim() !== '') {
                url += options.host;
            }
            if (options.protocol !== 'mongodb+srv://') {
                if (String(options.port || '').trim() !== '') {
                    url += ':' + options.port;
                }
            }
            if (String(options.options || '').trim() !== '') {
                url += '?' + options.options;
            }
        }
        return url;
    }
}
exports.DbConnectionNoSqlHelper = DbConnectionNoSqlHelper;
DbConnectionNoSqlHelper.getDbOptions = (optionsDb) => {
    return {
        protocol: (optionsDb === null || optionsDb === void 0 ? void 0 : optionsDb.protocol) || _appConfig_1.APP_CONFIG_OS_CORE.noSql.protocol,
        host: (optionsDb === null || optionsDb === void 0 ? void 0 : optionsDb.host) || _appConfig_1.APP_CONFIG_OS_CORE.noSql.host,
        port: (optionsDb === null || optionsDb === void 0 ? void 0 : optionsDb.port) || _appConfig_1.APP_CONFIG_OS_CORE.noSql.port,
        user: (optionsDb === null || optionsDb === void 0 ? void 0 : optionsDb.user) || _appConfig_1.APP_CONFIG_OS_CORE.noSql.user,
        password: (optionsDb === null || optionsDb === void 0 ? void 0 : optionsDb.password) || _appConfig_1.APP_CONFIG_OS_CORE.noSql.password,
        options: (optionsDb === null || optionsDb === void 0 ? void 0 : optionsDb.options) || _appConfig_1.APP_CONFIG_OS_CORE.noSql.options,
    };
};
//# sourceMappingURL=DbConnectionNoSqlHelper.js.map