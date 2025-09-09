"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DbConnectionSqlModelQueryBuilder = void 0;
const sequelize_1 = __importStar(require("sequelize"));
const PERMITTED_OPTIONS = {
    '=': sequelize_1.Op.eq,
    '>': sequelize_1.Op.gt,
    '>=': sequelize_1.Op.gte,
    IN: sequelize_1.Op.in,
    '<': sequelize_1.Op.lt,
    '<=': sequelize_1.Op.lte,
    'NOT IN': sequelize_1.Op.notIn,
    'NOT': sequelize_1.Op.not,
    LIKE: sequelize_1.Op.like,
    'NOT LIKE': sequelize_1.Op.notILike,
};
const OPERATOR_MAP = {
    $eq: sequelize_1.Op.eq,
    $gt: sequelize_1.Op.gt,
    $gte: sequelize_1.Op.gte,
    $in: sequelize_1.Op.in,
    $lt: sequelize_1.Op.lt,
    $lte: sequelize_1.Op.lte,
    $nin: sequelize_1.Op.notIn,
    $not: sequelize_1.Op.not,
    $like: sequelize_1.Op.like,
    $notLike: sequelize_1.Op.notLike,
    $between: sequelize_1.Op.between,
    $contains: sequelize_1.Op.contains,
};
class DbConnectionSqlModelQueryBuilder {
    constructor(dbConnection, includes) {
        this.dbConnection = dbConnection;
        this.includes = includes || {};
    }
    buildAttributes({ attributes, aggregates, }) {
        if (!(attributes === null || attributes === void 0 ? void 0 : attributes.length) && !aggregates) {
            return;
        }
        const res = [];
        if (attributes && attributes.length > 0) {
            res.push(...attributes);
        }
        if (aggregates) {
            for (const key in aggregates) {
                const aggregate = aggregates[key];
                if (aggregate.literal) {
                    res.push([sequelize_1.Sequelize.literal(aggregate.literal), key]);
                }
                else {
                    res.push([sequelize_1.Sequelize.fn(aggregate.fn, sequelize_1.Sequelize.col(aggregate.columnKey)), key]);
                }
            }
        }
        return res;
    }
    buildWhere({ where, filters, }) {
        if (!where && !filters) {
            return {};
        }
        if (!filters && where) {
            return this.parseWhereParamsToOpSequelize(where);
        }
        if (!where && filters) {
            return this.parseFiltersToOpSequelize(filters);
        }
        return Object.assign(Object.assign({}, this.parseWhereParamsToOpSequelize(where)), this.parseFiltersToOpSequelize(filters));
    }
    buildOrder({ order, include, orderAggregate, }) {
        if (!(include === null || include === void 0 ? void 0 : include.length) && !order && !orderAggregate) {
            return [];
        }
        const ordersSequelize = [];
        if (order) {
            for (const columnKey in order) {
                const value = order[columnKey];
                const currenValue = (value === null || value === void 0 ? void 0 : value.toUpperCase()) === 'ASC' ? 'ASC' : 'DESC';
                ordersSequelize.push([columnKey, currenValue]);
            }
        }
        if (orderAggregate) {
            for (const columnKey in orderAggregate) {
                const value = orderAggregate[columnKey];
                const currenValue = (value === null || value === void 0 ? void 0 : value.toUpperCase()) === 'ASC' ? 'ASC' : 'DESC';
                ordersSequelize.push([sequelize_1.Sequelize.literal(columnKey), currenValue]);
            }
        }
        if (include === null || include === void 0 ? void 0 : include.length) {
            for (const inc of include) {
                if (inc.order) {
                    for (const columnKey in inc.order) {
                        const value = inc.order[columnKey];
                        const currenValue = (value === null || value === void 0 ? void 0 : value.toUpperCase()) === 'ASC' ? 'ASC' : 'DESC';
                        ordersSequelize.push([inc.modelKey, columnKey, currenValue]);
                    }
                }
            }
        }
        return ordersSequelize;
    }
    getIncludes(incl) {
        if (!(incl === null || incl === void 0 ? void 0 : incl.length) || !this.includes) {
            return [];
        }
        const res = [];
        for (const inc of incl) {
            if (!(inc.modelKey in this.includes) ||
                !(this.includes[inc.modelKey].tableName in this.dbConnection.models)) {
                continue;
            }
            if (!inc.where && !inc.filters) {
                res.push({
                    model: this.dbConnection.models[this.includes[inc.modelKey].tableName],
                    as: inc.modelKey,
                    require: inc.require,
                });
                continue;
            }
            res.push({
                model: this.dbConnection.models[this.includes[inc.modelKey].tableName],
                as: inc.modelKey,
                require: inc.require,
                where: this.buildWhere({
                    where: inc.where,
                    filters: inc.filters,
                }),
            });
        }
        return res;
    }
    getRawOption(incl) {
        if (!(incl === null || incl === void 0 ? void 0 : incl.length) ||
            !this.includes) {
            return true;
        }
        const currentIncl = incl.find((inc) => inc.modelKey in this.includes);
        if (!currentIncl) {
            return true;
        }
        const include = this.includes[currentIncl.modelKey];
        return include.type !== 'hasMany';
    }
    parseWhereParamsToOpSequelize(where) {
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
                if (!(operator in PERMITTED_OPTIONS)) {
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
            //@ts-ignore
            filters[targetKey][this.getTargetOperator('=')] = this.getTargetValue('=', value);
        }
        return filters;
    }
    parseFiltersToOpSequelize(filters) {
        var _a;
        if (!filters) {
            return {};
        }
        const sequelizeWhere = {};
        for (const key in filters) {
            if (key === '$or') {
                sequelizeWhere[sequelize_1.Op.or] = ((_a = filters.$or) === null || _a === void 0 ? void 0 : _a.map(condition => this.parseFiltersToOpSequelize(condition))) || [];
                continue;
            }
            const condition = filters[key];
            if (typeof condition === 'object' && condition !== null) {
                if ('$contains' in condition) {
                    const values = condition.$contains;
                    if (values && (values === null || values === void 0 ? void 0 : values.length) >= 1) {
                        sequelizeWhere[key] = this.buildContainsFilterArray(key, values);
                    }
                }
                else {
                    const fieldConditions = {};
                    for (const operator in condition) {
                        //@ts-ignore
                        const sequelizeOperator = OPERATOR_MAP[operator];
                        if (sequelizeOperator) {
                            //@ts-ignore
                            fieldConditions[sequelizeOperator] = condition[operator];
                        }
                    }
                    sequelizeWhere[key] = fieldConditions;
                }
            }
            else {
                sequelizeWhere[key] = condition;
            }
        }
        return sequelizeWhere;
    }
    getTargetOperator(operator) {
        if (!(operator in PERMITTED_OPTIONS)) {
            return sequelize_1.Op.eq;
        }
        return PERMITTED_OPTIONS[operator];
    }
    buildContainsFilterArray(columnName, value) {
        if (value.length === 1) {
            return this.buildContainsFilter(columnName, value[0]);
        }
        return value.map((v) => this.buildContainsFilter(columnName, v)).join(' OR ');
    }
    buildContainsFilter(columnName, value) {
        const escapedValue = this.escapeValue(value);
        if (typeof value === 'string') {
            return sequelize_1.default.literal(`JSON_CONTAINS(${columnName}, '"${escapedValue}"')`);
        }
        return sequelize_1.default.literal(`JSON_CONTAINS(${columnName}, '${escapedValue}')`);
    }
    escapeValue(value) {
        if (typeof value === 'string') {
            return value.replace(/\\/g, '\\\\').replace(/'/g, '\\\'').replace(/"/g, '\\"');
        }
        return String(value);
    }
    getTargetValue(operator, value) {
        switch (operator) {
            case 'IN': {
                if (typeof value === 'string') {
                    return value.split(',');
                }
                return value;
            }
            case 'NOT IN': {
                if (typeof value === 'string') {
                    return value.split(',');
                }
                return value;
            }
            default:
                return value;
        }
    }
}
exports.DbConnectionSqlModelQueryBuilder = DbConnectionSqlModelQueryBuilder;
//# sourceMappingURL=DbConnectionSqlModelQueryBuilder.js.map