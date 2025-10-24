type RepositoryNoSqlColumn = RepositoryNoSqlColumnInteger | RepositoryNoSqlColumnString | RepositoryNoSqlColumnObject | RepositoryNoSqlColumnDateTime;
type RepositoryNoSqlColumnInteger = {
    type: 'INTEGER';
    defaultValue?: number | null;
};
type RepositoryNoSqlColumnString = {
    type: 'STRING';
    defaultValue?: string | null;
};
type RepositoryNoSqlColumnDateTime = {
    type: 'DATETIME';
    defaultValue?: Date | 'CURRENT_TIMESTAMP' | null;
};
type RepositoryNoSqlColumnObject = {
    type: 'OBJECT';
    defaultValue?: object | null;
};
type RepositorySqlColumnInteger = {
    allowNull?: boolean;
    type: 'INTEGER';
    defaultValue?: number | null;
};
type RepositorySqlColumnBigint = {
    allowNull?: boolean;
    type: 'BIGINT';
    defaultValue?: number | null;
};
type RepositorySqlColumnFloat = {
    allowNull?: boolean;
    type: 'FLOAT';
    defaultValue?: number | null;
};
type RepositorySqlColumnBoolean = {
    allowNull?: boolean;
    type: 'BOOLEAN';
    defaultValue?: boolean | null;
};
type RepositorySqlColumnString = {
    allowNull?: boolean;
    type: 'STRING';
    options?: {
        length: number;
    };
    defaultValue?: string | null;
};
type RepositorySqlColumnText = {
    allowNull?: boolean;
    type: 'TEXT';
    options?: {
        length: 'tiny' | 'medium' | 'long';
    };
    defaultValue?: string;
};
type RepositorySqlColumnDateTime = {
    type: 'DATETIME';
    defaultValue?: Date | 'CURRENT_TIMESTAMP' | null;
    allowNull?: boolean;
};
type RepositorySqlColumnJson = {
    type: 'JSON';
    defaultValue?: object | null;
    allowNull?: boolean;
};
type RepositorySqlColumn = RepositorySqlColumnInteger | RepositorySqlColumnBigint | RepositorySqlColumnFloat | RepositorySqlColumnBoolean | RepositorySqlColumnString | RepositorySqlColumnJson | RepositorySqlColumnText | RepositorySqlColumnDateTime;
export type GmRepositorySqlColumn = RepositorySqlColumn;
export type GmRepositoryNoSqlColumn = RepositoryNoSqlColumn;
export type GmCrudConfig = {
    dtoName: {
        singular: string;
        plural: string;
    };
    moduleName: string;
    repository: GmCrudRepositoryConfig;
    endpoints: GmCrudEndpointsConfig;
    hasSeparated: boolean;
    rootDir?: string;
    modulesDir?: string;
    hasMapper?: boolean;
};
type GmCrudRepositoryConfig = GmCrudSqlRepositoryConfig | GmCrudNoSqlRepositoryConfig;
export type GmCrudSqlRepositoryConfig = {
    columns: Record<string, GmRepositorySqlColumn>;
    dbType: 'sql';
    type: 'dynamicByDomain' | 'dynamicDbConfigByLegalEntityId' | 'staticByDbConnection';
};
export type GmCrudNoSqlRepositoryConfig = {
    columns: Record<string, GmRepositoryNoSqlColumn>;
    dbType: 'noSql';
    type: 'byDatabaseNameAndYearMonth' | 'staticByDbConnection';
};
export type GmCrudEndpointsConfig = {
    add: GmCrudEndpointConfigAction;
    delete: GmCrudEndpointConfigAction;
    update: GmCrudEndpointConfigAction;
    list: GmCrudEndpointConfig;
    get: GmCrudEndpointConfig;
};
export type GmCrudEndpointConfig = {
    hasAuth: boolean;
    hasStructureAccess: boolean;
};
export type GmCrudEndpointConfigAction = GmCrudEndpointConfig & {
    hasActionLogger: boolean;
};
export type GmCrudEndpointType = 'add' | 'delete' | 'update' | 'list' | 'get';
export {};
