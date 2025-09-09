"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LoaderModelNoSql = void 0;
const _db_1 = require("../../../db");
const _appError_1 = require("../../../appError");
const _helpers_1 = require("../../../helpers");
const _logger_1 = require("../../../logger");
const models = {};
class LoaderModelNoSql {
    static async byDatabaseNameAndCollectionName(props) {
        var _a;
        const key = this.buildCollectionKey({
            databaseName: props.databaseName,
            collectionName: props.collectionName,
        });
        if (key in models) {
            return models[key];
        }
        try {
            const dbConnection = await _db_1.DbConnectionNoSqlFactory.getDynamicByDatabaseName({
                databaseName: props.databaseName,
                optionsDb: props.optionsDb,
            });
            const model = dbConnection.defineModel({
                collectionName: props.databaseName,
                columns: props.columns,
                options: props.options,
                indexes: props.indexes,
            });
            if (props.indexes && ((_a = props.indexes) === null || _a === void 0 ? void 0 : _a.length) >= 1) {
                await model.syncIndexes();
            }
            models[key] = model;
            return model;
        }
        catch (error) {
            _logger_1.appLogger.error('os-core:Error get api mongoose', error);
            throw new _appError_1.AppError('os-core:Error get api mongoose', {
                errorKey: 'GET_MODEL_ERROR',
            });
        }
    }
    static async byDatabaseNameAndYearMonth(props) {
        var _a;
        const currentYear = _helpers_1.DateHelper.getCurrentYear();
        const maxYear = currentYear + 1;
        const minYear = currentYear - 5;
        if (props.year > maxYear || props.year < minYear) {
            throw new _appError_1.AppError(`The year cannot be more than 1 year in the future or less than 5 years before the current year. You provided: [${props.year}].`, {
                errorKey: 'GET_MODEL_ERROR',
            });
        }
        const key = this.buildKeyByYearMonth({
            databaseName: props.databaseName,
            collectionName: props.collectionName,
            year: props.year,
            month: props.month,
        });
        if (key in models) {
            return models[key];
        }
        try {
            const dbConnection = await _db_1.DbConnectionNoSqlFactory.getDynamicByDatabaseName({
                databaseName: props.databaseName,
                optionsDb: props.optionsDb,
            });
            const model = dbConnection.defineModel({
                collectionName: this.getCollectionNameByYearMonth({
                    year: props.year,
                    collectionName: props.collectionName,
                    month: props.month,
                }),
                columns: props.columns,
                options: props.options,
                indexes: props.indexes,
            });
            if (props.indexes && ((_a = props.indexes) === null || _a === void 0 ? void 0 : _a.length) >= 1) {
                await model.syncIndexes();
            }
            models[key] = model;
            return model;
        }
        catch (error) {
            _logger_1.appLogger.error('os-core:Error get api mongoose', error);
            throw new _appError_1.AppError('os-core:Error get api mongoose', {
                errorKey: 'GET_MODEL_ERROR',
            });
        }
    }
    static getModelKeysFromCache() {
        return Object.keys(models);
    }
    static deleteModelFromCacheByDatabaseNameAndCollectionName(props) {
        const key = this.buildCollectionKey({
            databaseName: props.databaseName,
            collectionName: props.collectionName,
        });
        if (!(key in models)) {
            _logger_1.appLogger.error(`delete model:not found model ${key} in cache`);
            return;
        }
        delete models[key];
    }
    static formatNumber(num) {
        if (num === 0) {
            return '01';
        }
        return num < 10 ? `0${num}` : `${num}`;
    }
    static buildKeyByYearMonth({ databaseName, collectionName, year, month, }) {
        return `${databaseName}_${collectionName}_${year}_${this.formatNumber(month)}`;
    }
    static buildCollectionKey(props) {
        return `${props.databaseName}_${props.collectionName}`;
    }
}
exports.LoaderModelNoSql = LoaderModelNoSql;
LoaderModelNoSql.getCollectionNameByYearMonth = ({ month, collectionName, year, }) => {
    const currentMoth = month >= 10 ? month.toString() : `0${month}`;
    return `${collectionName}_${year}_${currentMoth}`;
};
//# sourceMappingURL=LoaderModelNoSql.js.map