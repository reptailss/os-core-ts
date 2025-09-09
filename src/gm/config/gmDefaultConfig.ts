import {GmConfig, GmEndpointsConfig, GmNoSqlModelConfig, GmSqlModelConfig} from '@gm'


const GM_MODEL_NO_SQL_YEAR_AND_MONTH_CONFIG: GmNoSqlModelConfig = {
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
}


const GM_BASE_ENDPOINTS_CONFIG: GmEndpointsConfig = {
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
}

const GM_MODEL_SQL_DYNAMIC_BY_DOMAIN_CONFIG: GmSqlModelConfig = {
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
}

const GM_MODEL_SQL_DYNAMIC_BY_LE_ID_CONFIG: GmSqlModelConfig = {
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
}


const GM_MODEL_SQL_STATIC_BY_DB_CONNECTION_CONFIG: GmSqlModelConfig = {
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
}

const GM_DEFAULT_CONFIG: GmConfig = {
    dtoName: {
        singular: 'User',
        plural: 'Users',
    },
    moduleName: 'Users',
    model: GM_MODEL_SQL_DYNAMIC_BY_DOMAIN_CONFIG,
    endpoints: GM_BASE_ENDPOINTS_CONFIG,
    hasSeparated: true,
    rootDir:'src'
}
export const gmDefaultConfig = {
    default: GM_DEFAULT_CONFIG,
    baseEndpoints: GM_BASE_ENDPOINTS_CONFIG,
    sqlByStaticDbConnection: GM_MODEL_SQL_STATIC_BY_DB_CONNECTION_CONFIG,
    sqlByDynamicDomain: GM_MODEL_SQL_DYNAMIC_BY_DOMAIN_CONFIG,
    sqlByDynamicLeId: GM_MODEL_SQL_DYNAMIC_BY_LE_ID_CONFIG,
    noSqlByYearAndMonth: GM_MODEL_NO_SQL_YEAR_AND_MONTH_CONFIG,
} as const
