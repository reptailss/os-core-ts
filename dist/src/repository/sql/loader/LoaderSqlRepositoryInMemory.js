"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LoaderSqlRepositoryInMemory = void 0;
const core_1 = require("../../core");
const _db_1 = require("../../../db");
class LoaderSqlRepositoryInMemory {
    async dynamicByDomain(props) {
        const key = `domain-${props.domain}_${props.tableName}`;
        const repositoryFromCash = core_1.SqlRepositoryCashManager.getFromCash(key);
        if (repositoryFromCash) {
            return repositoryFromCash;
        }
        const dbConnection = await _db_1.DbConnectionSqlFactory.getDynamicByDomain(props.domain);
        const repository = new core_1.SqlRepositorySqlite(dbConnection, props.tableName, props.entity, props.indexes);
        repository.saveExtraData('domain', props.domain);
        await repository.syncRepository();
        if (props.registry) {
            props.registry.register(repository);
        }
        core_1.SqlRepositoryCashManager.saveToCash(key, repository);
        return repository;
    }
    async dynamicDbConfigByLegalEntityId(props) {
        const key = `le-${props.legalEntityId}_${props.tableName}`;
        const repositoryFromCash = core_1.SqlRepositoryCashManager.getFromCash(key);
        if (repositoryFromCash) {
            return repositoryFromCash;
        }
        const dbConnection = await _db_1.DbConnectionSqlFactory.getDynamicByLeId(props.legalEntityId);
        const repository = new core_1.SqlRepositorySqlite(dbConnection, props.tableName, props.entity, props.indexes);
        repository.saveExtraData('leId', props.legalEntityId.toString());
        await repository.syncRepository();
        if (props.migrationTaskFactory) {
            await new props.migrationTaskFactory(new _db_1.SqlMigrations(dbConnection, props.tableName), dbConnection).runMigrations();
        }
        if (props.registry) {
            props.registry.register(repository);
        }
        core_1.SqlRepositoryCashManager.saveToCash(key, repository);
        return repository;
    }
    staticByDbConnection(props) {
        const key = `static-${props.tableName}`;
        const repositoryFromCash = core_1.SqlRepositoryCashManager.getFromCash(key);
        if (repositoryFromCash) {
            return repositoryFromCash;
        }
        const repository = new core_1.SqlRepositorySqlite(props.dbConnection, props.tableName, props.entity, props.indexes, props.includes);
        props.dbConnection.addModelForAssociation(props.tableName, repository);
        core_1.SqlRepositoryCashManager.saveToCash(key, repository);
        return repository;
    }
}
exports.LoaderSqlRepositoryInMemory = LoaderSqlRepositoryInMemory;
//# sourceMappingURL=LoaderSqlRepositoryInMemory.js.map