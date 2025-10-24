"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.LoaderNoSqlRepository = void 0;
const _db_1 = require("../../../db");
const _appError_1 = require("../../../appError");
const _repository_1 = require("../..");
const _decorators_1 = require("../../../decorators");
const _helpers_1 = require("../../../helpers");
const core_1 = require("../../core");
function getCollectionNameByYearMonth({ month, collectionName, year, }) {
    const currentMoth = month >= 10 ? month.toString() : `0${month}`;
    return `${collectionName}_${year}_${currentMoth}`;
}
function formatNumber(num) {
    if (num === 0) {
        return '01';
    }
    return num < 10 ? `0${num}` : `${num}`;
}
function buildKeyByYearMonth({ databaseName, collectionName, year, month, }) {
    return `${databaseName}_${collectionName}_${year}_${formatNumber(month)}`;
}
function buildCollectionKey(props) {
    return `${props.databaseName}_${props.collectionName}`;
}
let LoaderNoSqlRepository = class LoaderNoSqlRepository {
    async byDatabaseNameAndCollectionName(props) {
        var _a;
        const key = buildCollectionKey({
            databaseName: props.databaseName,
            collectionName: props.collectionName,
        });
        const oldRepository = core_1.NoSqlRepositoriesCashManager.getFromCash(key);
        if (oldRepository) {
            return oldRepository;
        }
        const dbConnection = _db_1.DbConnectionNoSqlFactory.getStaticByDatabaseName(props.databaseName);
        await dbConnection.connect();
        const repository = new _repository_1.NoSqlRepository(dbConnection, props.collectionName, props.entity, props.indexes);
        if (props.indexes && ((_a = props.indexes) === null || _a === void 0 ? void 0 : _a.length) >= 1) {
            await repository.syncIndexes();
        }
        core_1.NoSqlRepositoriesCashManager.saveToCash(key, repository);
        return repository;
    }
    async byDatabaseNameAndYearMonth(props) {
        var _a;
        const currentYear = _helpers_1.DateHelper.getCurrentYear();
        const maxYear = currentYear + 1;
        const minYear = currentYear - 5;
        if (props.year > maxYear || props.year < minYear) {
            throw new _appError_1.AppError(`The year cannot be more than 1 year in the future or less than 5 years before the current year. You provided: [${props.year}].`, {
                errorKey: 'GET_MODEL_ERROR',
            });
        }
        const key = buildKeyByYearMonth({
            databaseName: props.databaseName,
            collectionName: props.collectionName,
            year: props.year,
            month: props.month,
        });
        const oldRepository = core_1.NoSqlRepositoriesCashManager.getFromCash(key);
        if (oldRepository) {
            return oldRepository;
        }
        const dbConnection = _db_1.DbConnectionNoSqlFactory.getStaticByDatabaseName(props.databaseName);
        await dbConnection.connect();
        const repository = new _repository_1.NoSqlRepository(dbConnection, getCollectionNameByYearMonth({
            year: props.year,
            collectionName: props.collectionName,
            month: props.month,
        }), props.entity, props.indexes);
        if (props.indexes && ((_a = props.indexes) === null || _a === void 0 ? void 0 : _a.length) >= 1) {
            await repository.syncIndexes();
        }
        core_1.NoSqlRepositoriesCashManager.saveToCash(key, repository);
        return repository;
    }
    staticByDbConnection(props) {
        const key = `${props.dbConnection.cashedKey}-static-${props.collectionName}`;
        const repositoryFromCash = core_1.NoSqlRepositoriesCashManager.getFromCash(key);
        if (repositoryFromCash) {
            return repositoryFromCash;
        }
        const repository = new _repository_1.NoSqlRepository(props.dbConnection, props.collectionName, props.entity, props.indexes);
        core_1.NoSqlRepositoriesCashManager.saveToCash(key, repository);
        return repository;
    }
};
exports.LoaderNoSqlRepository = LoaderNoSqlRepository;
exports.LoaderNoSqlRepository = LoaderNoSqlRepository = __decorate([
    (0, _decorators_1.Injectable)()
], LoaderNoSqlRepository);
//# sourceMappingURL=LoaderNoSqlRepository.js.map