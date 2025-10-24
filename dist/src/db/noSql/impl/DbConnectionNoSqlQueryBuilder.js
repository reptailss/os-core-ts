"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DbConnectionNoSqlQueryBuilder = void 0;
const permittedOptions = {
    '>': '$gt',
    '<': '$lt',
    '>=': '$gte',
    '<=': '$lte',
    '=': '$eq',
    IN: '$in',
    'NOT IN': '$nin',
    'NOT': '$not',
    LIKE: '$regex',
    'NOT LIKE': '$not',
};
class DbConnectionNoSqlQueryBuilder {
    constructor() {
        this.buildOrders = (orders) => {
            if (!orders || !Object.keys(orders).length) {
                return [];
            }
            const orderMongoose = [];
            for (const columnKey in orders) {
                const value = orders[columnKey];
                const currentValue = (value === null || value === void 0 ? void 0 : value.toUpperCase()) === 'ASC' ? 1 : -1;
                //@ts-ignore
                orderMongoose.push([columnKey, currentValue]);
            }
            return orderMongoose;
        };
    }
    buildWhere(where, clientWhere) {
        if (!clientWhere && !where) {
            return {};
        }
        if (!where && where) {
            return this.parseWhereParamsToOpMongoose(clientWhere);
        }
        if (!where && where) {
            return where;
        }
        return Object.assign(Object.assign({}, this.parseWhereParamsToOpMongoose(clientWhere)), where);
    }
    parseWhereParamsToOpMongoose(where) {
        var _a;
        if (!where) {
            return {};
        }
        const filters = {};
        for (const k in where) {
            const key = k;
            //@ts-ignore
            const value = where[key];
            const arr = key === null || key === void 0 ? void 0 : key.toString().split(' ');
            if ((arr === null || arr === void 0 ? void 0 : arr.length) >= 2) {
                const operator = (_a = arr[1]) === null || _a === void 0 ? void 0 : _a.toUpperCase();
                if (!(operator in permittedOptions)) {
                    continue;
                }
                const targetKey = arr[0];
                if (!(targetKey in filters)) {
                    filters[targetKey] = {};
                }
                const targetOperator = this.getTargetOperator(operator);
                //@ts-ignore
                filters[targetKey][targetOperator] = this.getTargetValue(operator, value);
                continue;
            }
            const targetKey = key;
            if (!(targetKey in filters)) {
                filters[targetKey] = {};
            }
            const targetOperator = this.getTargetOperator('=');
            //@ts-ignore
            filters[targetKey][targetOperator] = this.getTargetValue('=', value);
        }
        return filters;
    }
    getTargetOperator(operator) {
        if (!(operator in permittedOptions)) {
            return '$eq';
        }
        return permittedOptions[operator];
    }
    getTargetValue(operator, value) {
        switch (operator) {
            case 'LIKE': {
                if (typeof value === 'string') {
                    return new RegExp(value === null || value === void 0 ? void 0 : value.replace('%', ''), 'i');
                }
                return value;
            }
            case 'IN': {
                if (typeof value === 'string') {
                    return value === null || value === void 0 ? void 0 : value.split(',');
                }
                return value;
            }
            case 'NOT IN': {
                if (typeof value === 'string') {
                    return value === null || value === void 0 ? void 0 : value.split(',');
                }
                return value;
            }
            default:
                return value;
        }
    }
}
exports.DbConnectionNoSqlQueryBuilder = DbConnectionNoSqlQueryBuilder;
//# sourceMappingURL=DbConnectionNoSqlQueryBuilder.js.map