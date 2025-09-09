"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ModelNoSqlPagination = void 0;
const core_1 = require("../../core");
const _logger_1 = require("../../../logger");
class ModelNoSqlPagination {
    static byYearAndMoth({ dateStart, dateEnd, getModelCb, params, filters, options, attributes, settings, }) {
        const collectionNames = core_1.ModelNoSqlHelper.getCollectionNamesPaginationByDateRangeNoSql({
            dateStart,
            dateEnd,
        });
        const getModelCbWithInterval = (collectionName) => {
            const { month, year } = core_1.ModelNoSqlHelper.getYearAndMothByCollectionName(collectionName);
            return getModelCb({
                month, year,
            });
        };
        const dateFilterKey = (settings === null || settings === void 0 ? void 0 : settings.dateFilterKey) || (options === null || options === void 0 ? void 0 : options.dateAdd) || 'date_add';
        return this.byCollectionNames({
            params,
            getModelCb: getModelCbWithInterval,
            collectionNames: core_1.ModelNoSqlHelper.checkReverseCollection({
                order: params === null || params === void 0 ? void 0 : params.order,
                dateFilterKey,
            }) ? collectionNames.reverse() : collectionNames,
            filters: Object.assign({ [dateFilterKey]: {
                    $gte: new Date(dateStart),
                    $lte: new Date(dateEnd),
                } }, (filters !== null && filters !== void 0 ? filters : {})),
            attributes,
        });
    }
    static async byCollectionNames({ getModelCb, params, collectionNames, filters, attributes, }) {
        if (!(collectionNames === null || collectionNames === void 0 ? void 0 : collectionNames.length)) {
            return {
                page: 1,
                all_pages: 1,
                per_page: 0,
                all_rows: 0,
                rows: [],
            };
        }
        if (params.per_page === 0) {
            let found = [];
            try {
                const page = params.page || 1;
                const rows = [];
                for (const collectionName of collectionNames) {
                    let model = null;
                    try {
                        model = await getModelCb(collectionName);
                    }
                    catch (error) {
                        _logger_1.appLogger.error('os-core: Error paginationTypes get nosql api:', error);
                    }
                    if (!model) {
                        continue;
                    }
                    found = await model.findAll({
                        where: params.where,
                        filters,
                        order: params.order,
                        attributes,
                    });
                    if (!(found === null || found === void 0 ? void 0 : found.length)) {
                        continue;
                    }
                    for (let i = 0; i < found.length; i++) {
                        rows.push(found[i]);
                    }
                    found = [];
                }
                return {
                    page,
                    all_pages: 1,
                    per_page: 0,
                    all_rows: rows.length,
                    rows: rows,
                };
            }
            catch (error) {
                _logger_1.appLogger.error('os-core:Error paginationTypes by api nosql', error);
                return {
                    page: 1,
                    all_pages: 1,
                    per_page: 0,
                    all_rows: 0,
                    rows: [],
                };
            }
        }
        const page = params.page || 1;
        const perPage = params.per_page || 10;
        let skipCount = (page - 1) * perPage;
        let countAllRows = 0;
        let totalRowsInPage = perPage;
        let found = [];
        const rows = [];
        try {
            for (const collectionName of collectionNames) {
                let model = null;
                try {
                    model = await getModelCb(collectionName);
                }
                catch (error) {
                    _logger_1.appLogger.error('os-core: Error paginationTypes get nosql api:', error);
                }
                if (!model) {
                    continue;
                }
                if (skipCount > 0) {
                    const count = await model.count({
                        where: params.where,
                        filters,
                    });
                    if (!count) {
                        continue;
                    }
                    countAllRows += count;
                    if (count >= skipCount) {
                        found = await model.findAll({
                            where: params.where,
                            filters,
                            offset: skipCount,
                            limit: totalRowsInPage,
                            order: params.order,
                            attributes,
                        });
                        skipCount -= Math.min(skipCount, (found === null || found === void 0 ? void 0 : found.length) || 0);
                        if (found === null || found === void 0 ? void 0 : found.length) {
                            totalRowsInPage -= found.length;
                            for (let i = 0; i < found.length; i++) {
                                rows.push(found[i]);
                            }
                            found = [];
                        }
                        continue;
                    }
                    skipCount -= count;
                    continue;
                }
                if (!totalRowsInPage) {
                    const count = await model.count({
                        where: params.where,
                        filters,
                    });
                    countAllRows += count;
                    continue;
                }
                const count = await model.count({
                    where: params.where,
                    filters,
                });
                countAllRows += count;
                found = await model.findAll({
                    where: params.where,
                    filters,
                    limit: totalRowsInPage,
                    order: params.order,
                    attributes,
                });
                if (found === null || found === void 0 ? void 0 : found.length) {
                    totalRowsInPage -= found.length;
                    for (let i = 0; i < found.length; i++) {
                        rows.push(found[i]);
                    }
                    found = [];
                }
            }
            return {
                page,
                all_pages: Math.ceil(countAllRows / Number(perPage)),
                per_page: perPage,
                all_rows: countAllRows,
                rows: rows,
            };
        }
        catch (error) {
            _logger_1.appLogger.error('os-core:Error paginationTypes by api nosql', error);
            return {
                page: 1,
                all_pages: 1,
                per_page: 0,
                all_rows: 0,
                rows: [],
            };
        }
    }
}
exports.ModelNoSqlPagination = ModelNoSqlPagination;
//# sourceMappingURL=PaginationNoSql.js.map