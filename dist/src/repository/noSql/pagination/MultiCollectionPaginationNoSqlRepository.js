"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MultiCollectionPaginationNoSqlRepository = void 0;
const _logger_1 = require("../../../logger");
const _helpers_1 = require("../../../helpers");
const _appError_1 = require("../../../appError");
function getCollectionNamesPaginationByDateRangeNoSql({ dateStart, dateEnd, }) {
    return _helpers_1.DateHelper.generateDateIntervalsYearAndMonthByRange(dateStart, dateEnd).map((item) => {
        return `${item.year}||${item.month}`;
    });
}
function getYearAndMothByCollectionName(collectionName) {
    const arr = collectionName === null || collectionName === void 0 ? void 0 : collectionName.split('||');
    if (arr.length < 2) {
        return {
            year: 0,
            month: 0,
        };
    }
    return {
        year: Number(arr[0]),
        month: Number(arr[1]),
    };
}
function checkReverseCollection({ order, dateFilterKey, }) {
    if (!dateFilterKey ||
        !order ||
        !(dateFilterKey in order)) {
        return false;
    }
    //@ts-ignore
    return order[dateFilterKey] === 'DESC';
}
class MultiCollectionPaginationNoSqlRepository {
    static async byYearAndMoth({ dateStart, dateEnd, loaderRepository, params, where, attributes, dateKey, }) {
        const entityInstance = loaderRepository.entity;
        const collections = getCollectionNamesPaginationByDateRangeNoSql({
            dateStart,
            dateEnd,
        });
        const dateFilterKey = dateKey || entityInstance._dateAdd || entityInstance._dateUpdate || null;
        const collectionNames = checkReverseCollection({
            order: params === null || params === void 0 ? void 0 : params.order,
            dateFilterKey,
        }) ? collections.reverse() : collections;
        const targetWhere = where ? Object.assign({}, where) : {};
        if (dateFilterKey) {
            targetWhere[dateFilterKey] = {
                $gte: new Date(dateStart),
                $lte: new Date(dateEnd)
            };
        }
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
                    const { month, year, } = getYearAndMothByCollectionName(collectionName);
                    const repository = await loaderRepository.load.call(loaderRepository, month, year);
                    found = await repository.findAll({
                        clientWhere: params.where,
                        where: targetWhere,
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
                _logger_1.appLogger.error('os-core:Error mongoose pagination', error);
                throw new _appError_1.AppError('os-core:Error mongoose pagination');
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
                const { month, year, } = getYearAndMothByCollectionName(collectionName);
                const repository = await loaderRepository.load.call(loaderRepository, month, year);
                if (skipCount > 0) {
                    const count = await repository.count({
                        clientWhere: params.where,
                        where: targetWhere,
                    });
                    if (!count) {
                        continue;
                    }
                    countAllRows += count;
                    if (count >= skipCount) {
                        found = await repository.findAll({
                            clientWhere: params.where,
                            where: targetWhere,
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
                    const count = await repository.count({
                        clientWhere: params.where,
                        where: targetWhere,
                    });
                    countAllRows += count;
                    continue;
                }
                const count = await repository.count({
                    clientWhere: params.where,
                    where: targetWhere,
                });
                countAllRows += count;
                found = await repository.findAll({
                    clientWhere: params.where,
                    where: targetWhere,
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
            _logger_1.appLogger.error('os-core:Error mongoose pagination', error);
            throw new _appError_1.AppError('os-core:Error mongoose pagination');
        }
    }
    static async byCollectionNames({ loaderRepository, params, collectionNames, where, attributes, }) {
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
                    const repository = await loaderRepository.load.call(loaderRepository, collectionName);
                    found = await repository.findAll({
                        clientWhere: params.where,
                        where,
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
                _logger_1.appLogger.error('os-core:Error mongoose pagination', error);
                throw new _appError_1.AppError('os-core:Error mongoose pagination');
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
                const repository = await loaderRepository.load.call(loaderRepository, collectionName);
                if (skipCount > 0) {
                    const count = await repository.count({
                        clientWhere: params.where,
                        where,
                    });
                    if (!count) {
                        continue;
                    }
                    countAllRows += count;
                    if (count >= skipCount) {
                        found = await repository.findAll({
                            clientWhere: params.where,
                            where,
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
                    const count = await repository.count({
                        clientWhere: params.where,
                        where,
                    });
                    countAllRows += count;
                    continue;
                }
                const count = await repository.count({
                    clientWhere: params.where,
                    where,
                });
                countAllRows += count;
                found = await repository.findAll({
                    clientWhere: params.where,
                    where,
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
            _logger_1.appLogger.error('os-core:Error mongoose pagination', error);
            throw new _appError_1.AppError('os-core:Error mongoose pagination');
        }
    }
}
exports.MultiCollectionPaginationNoSqlRepository = MultiCollectionPaginationNoSqlRepository;
//# sourceMappingURL=MultiCollectionPaginationNoSqlRepository.js.map