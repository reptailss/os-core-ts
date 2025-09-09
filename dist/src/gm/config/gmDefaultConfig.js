"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.gmDefaultConfig = void 0;
const GM_MODEL_NO_SQL_YEAR_AND_MONTH_CONFIG = {
    dbType: 'noSql',
    type: 'byDatabaseNameAndYearMonth',
    columns: {
        name: {
            type: 'STRING',
        },
        price: {
            type: 'INTEGER',
        },
    },
};
const GM_BASE_ENDPOINTS_CONFIG = {
    add: {
        hasActionLogger: true,
        hasAuth: true,
        hasStructureAccess: true,
    },
    update: {
        hasActionLogger: true,
        hasAuth: true,
        hasStructureAccess: true,
    },
    delete: {
        hasActionLogger: true,
        hasAuth: true,
        hasStructureAccess: true,
    },
    get: {
        hasAuth: false,
        hasStructureAccess: false,
    },
    list: {
        hasAuth: false,
        hasStructureAccess: false,
    },
};
const GM_MODEL_SQL_DYNAMIC_BY_DOMAIN_CONFIG = {
    dbType: 'sql',
    type: 'dynamicByDomain',
    columns: {
        name: {
            type: 'STRING',
        },
        age: {
            type: 'INTEGER',
        },
    },
};
const GM_MODEL_SQL_DYNAMIC_BY_LE_ID_CONFIG = {
    dbType: 'sql',
    type: 'dynamicDbConfigByLegalEntityId',
    columns: {
        title: {
            type: 'STRING',
        },
        user_id: {
            type: 'INTEGER',
        },
    },
};
const GM_MODEL_SQL_STATIC_BY_DB_CONNECTION_CONFIG = {
    dbType: 'sql',
    type: 'staticByDbConnection',
    columns: {
        title: {
            type: 'STRING',
        },
        description: {
            type: 'STRING',
        },
    },
};
const GM_DEFAULT_CONFIG = {
    dtoName: {
        singular: 'User',
        plural: 'Users',
    },
    moduleName: 'Users',
    model: GM_MODEL_SQL_DYNAMIC_BY_DOMAIN_CONFIG,
    endpoints: GM_BASE_ENDPOINTS_CONFIG,
    hasSeparated: true,
    rootDir: 'src'
};
exports.gmDefaultConfig = {
    default: GM_DEFAULT_CONFIG,
    baseEndpoints: GM_BASE_ENDPOINTS_CONFIG,
    sqlByStaticDbConnection: GM_MODEL_SQL_STATIC_BY_DB_CONNECTION_CONFIG,
    sqlByDynamicDomain: GM_MODEL_SQL_DYNAMIC_BY_DOMAIN_CONFIG,
    sqlByDynamicLeId: GM_MODEL_SQL_DYNAMIC_BY_LE_ID_CONFIG,
    noSqlByYearAndMonth: GM_MODEL_NO_SQL_YEAR_AND_MONTH_CONFIG,
};
//# sourceMappingURL=gmDefaultConfig.js.map