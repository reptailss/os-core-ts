"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LoaderDbConnectionSqlConfigByByDomainInMemory = exports.LoaderDbConnectionSqlConfigByLeIdInMemory = exports.LoaderDbConnectionSqlConfigStaticInMemory = void 0;
class LoaderDbConnectionSqlConfigStaticInMemory {
    getConfig() {
        return {
            logging: false,
            dialect: 'sqlite',
            storage: ':memory:',
            cashedKey: 'static-in-memory',
            hasKeepConnectionAlive: false,
        };
    }
}
exports.LoaderDbConnectionSqlConfigStaticInMemory = LoaderDbConnectionSqlConfigStaticInMemory;
class LoaderDbConnectionSqlConfigByLeIdInMemory {
    async getConfig(legalEntityId) {
        return {
            logging: false,
            dialect: 'sqlite',
            storage: ':memory:',
            cashedKey: `dynamic-in-memory-by-le-id:${legalEntityId}`,
            hasKeepConnectionAlive: false,
        };
    }
}
exports.LoaderDbConnectionSqlConfigByLeIdInMemory = LoaderDbConnectionSqlConfigByLeIdInMemory;
class LoaderDbConnectionSqlConfigByByDomainInMemory {
    async getConfig(domain) {
        return {
            logging: false,
            dialect: 'sqlite',
            storage: ':memory:',
            cashedKey: `dynamic-in-memory-by-domain:${domain}`,
            hasKeepConnectionAlive: false,
        };
    }
}
exports.LoaderDbConnectionSqlConfigByByDomainInMemory = LoaderDbConnectionSqlConfigByByDomainInMemory;
//# sourceMappingURL=LoaderDbConnectionSqlConfigIMemory.js.map