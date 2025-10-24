"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EntityJson = exports.EntityDate = exports.EntityText = exports.EntityString = exports.EntityBoolean = exports.EntityFloat = exports.EntityBigInt = exports.EntityInteger = exports.EntityDateUpdate = exports.EntityDateAdd = exports.EntityPrimaryStringKey = exports.EntityPrimaryNumberKey = void 0;
function EntityPrimaryNumberKey() {
    return function (target, propertyKey) {
        target.constructor._primaryKey = propertyKey;
    };
}
exports.EntityPrimaryNumberKey = EntityPrimaryNumberKey;
function EntityPrimaryStringKey() {
    return function (target, propertyKey) {
        target.constructor._primaryKey = propertyKey;
    };
}
exports.EntityPrimaryStringKey = EntityPrimaryStringKey;
function EntityDateAdd() {
    return function (target, propertyKey) {
        target.constructor._dateAdd = propertyKey;
    };
}
exports.EntityDateAdd = EntityDateAdd;
function EntityDateUpdate() {
    return function (target, propertyKey) {
        target.constructor._dateUpdate = propertyKey;
    };
}
exports.EntityDateUpdate = EntityDateUpdate;
function EntityInteger(options) {
    return function (target, propertyKey) {
        if (!target.constructor._columns) {
            target.constructor._columns = {};
        }
        target.constructor._columns[propertyKey] = {
            allowNull: options === null || options === void 0 ? void 0 : options.allowNull,
            type: 'INTEGER',
            defaultValue: options === null || options === void 0 ? void 0 : options.defaultValue,
        };
    };
}
exports.EntityInteger = EntityInteger;
function EntityBigInt(options) {
    return function (target, propertyKey) {
        if (!target.constructor._columns) {
            target.constructor._columns = {};
        }
        target.constructor._columns[propertyKey] = {
            allowNull: options === null || options === void 0 ? void 0 : options.allowNull,
            type: 'BIGINT',
            defaultValue: options === null || options === void 0 ? void 0 : options.defaultValue,
        };
    };
}
exports.EntityBigInt = EntityBigInt;
function EntityFloat(options) {
    return function (target, propertyKey) {
        if (!target.constructor._columns) {
            target.constructor._columns = {};
        }
        target.constructor._columns[propertyKey] = {
            allowNull: options === null || options === void 0 ? void 0 : options.allowNull,
            type: 'FLOAT',
            defaultValue: options === null || options === void 0 ? void 0 : options.defaultValue,
        };
    };
}
exports.EntityFloat = EntityFloat;
function EntityBoolean(options) {
    return function (target, propertyKey) {
        if (!target.constructor._columns) {
            target.constructor._columns = {};
        }
        target.constructor._columns[propertyKey] = {
            allowNull: options === null || options === void 0 ? void 0 : options.allowNull,
            type: 'BOOLEAN',
            defaultValue: options === null || options === void 0 ? void 0 : options.defaultValue,
        };
    };
}
exports.EntityBoolean = EntityBoolean;
function EntityString(options) {
    return function (target, propertyKey) {
        if (!target.constructor._columns) {
            target.constructor._columns = {};
        }
        target.constructor._columns[propertyKey] = {
            allowNull: options === null || options === void 0 ? void 0 : options.allowNull,
            type: 'STRING',
            defaultValue: options === null || options === void 0 ? void 0 : options.defaultValue,
            options: {
                length: options === null || options === void 0 ? void 0 : options.length,
            },
        };
    };
}
exports.EntityString = EntityString;
function EntityText(options) {
    return function (target, propertyKey) {
        if (!target.constructor._columns) {
            target.constructor._columns = {};
        }
        target.constructor._columns[propertyKey] = {
            allowNull: options === null || options === void 0 ? void 0 : options.allowNull,
            type: 'TEXT',
            defaultValue: options === null || options === void 0 ? void 0 : options.defaultValue,
            options: {
                length: options === null || options === void 0 ? void 0 : options.length,
            },
        };
    };
}
exports.EntityText = EntityText;
function EntityDate(options) {
    return function (target, propertyKey) {
        if (!target.constructor._columns) {
            target.constructor._columns = {};
        }
        target.constructor._columns[propertyKey] = {
            allowNull: options === null || options === void 0 ? void 0 : options.allowNull,
            type: 'DATETIME',
            defaultValue: options === null || options === void 0 ? void 0 : options.defaultValue,
        };
    };
}
exports.EntityDate = EntityDate;
function EntityJson(options) {
    return function (target, propertyKey) {
        if (!target.constructor._columns) {
            target.constructor._columns = {};
        }
        target.constructor._columns[propertyKey] = {
            allowNull: options === null || options === void 0 ? void 0 : options.allowNull,
            type: 'JSON',
            defaultValue: options === null || options === void 0 ? void 0 : options.defaultValue,
        };
    };
}
exports.EntityJson = EntityJson;
//# sourceMappingURL=entityColumns.js.map