"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.LoaderSqlRepository = void 0;
const _db_1 = require("../../../db");
const core_1 = require("../../core");
const _repository_1 = require("../..");
const _decorators_1 = require("../../../decorators");
let LoaderSqlRepository = class LoaderSqlRepository {
    async dynamicByDomain(props) {
        const key = `domain-${props.domain}_${props.tableName}`;
        const repositoryFromCash = core_1.SqlRepositoryCashManager.getFromCash(key);
        if (repositoryFromCash) {
            return repositoryFromCash;
        }
        const dbConnection = await _db_1.DbConnectionSqlFactory.getDynamicByDomain(props.domain);
        const repository = new _repository_1.SqlRepository(dbConnection, props.tableName, props.entity, props.indexes);
        repository.saveExtraData('domain', props.domain);
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
    async dynamicDbConfigByLegalEntityId(props) {
        const key = `le-${props.legalEntityId}_${props.tableName}`;
        const repositoryFromCash = core_1.SqlRepositoryCashManager.getFromCash(key);
        if (repositoryFromCash) {
            return repositoryFromCash;
        }
        const dbConnection = await _db_1.DbConnectionSqlFactory.getDynamicByLeId(props.legalEntityId);
        const repository = new _repository_1.SqlRepository(dbConnection, props.tableName, props.entity, props.indexes);
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
        const key = `${props.dbConnection.cashedKey}-static-${props.tableName}`;
        const repositoryFromCash = core_1.SqlRepositoryCashManager.getFromCash(key);
        if (repositoryFromCash) {
            return repositoryFromCash;
        }
        const repository = new _repository_1.SqlRepository(props.dbConnection, props.tableName, props.entity, props.indexes, props.includes);
        props.dbConnection.addModelForAssociation(props.tableName, repository);
        core_1.SqlRepositoryCashManager.saveToCash(key, repository);
        return repository;
    }
};
exports.LoaderSqlRepository = LoaderSqlRepository;
exports.LoaderSqlRepository = LoaderSqlRepository = __decorate([
    (0, _decorators_1.Injectable)()
], LoaderSqlRepository);
//# sourceMappingURL=LoaderSqlRepository.js.map