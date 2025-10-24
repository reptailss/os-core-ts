"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DbConnectionNoSql = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const _appError_1 = require("../../../appError");
const core_1 = require("../../core");
class DbConnectionNoSql {
    constructor(databaseName) {
        this.databaseName = databaseName;
        this.cashedKey = databaseName;
    }
    async connect() {
        const newMongoose = await mongoose_1.default.connect(core_1.DbConnectionNoSqlHelper.getDbUrl(core_1.DbConnectionNoSqlHelper.getDbOptions()));
        if (!(newMongoose === null || newMongoose === void 0 ? void 0 : newMongoose.connection)) {
            throw new _appError_1.AppError('os-core:Error get connecting mongoose database', {
                errorKey: 'CONNECT_TO_DB_ERROR',
            });
        }
        const newConnectionMongoose = newMongoose.connection.useDb(this.databaseName);
        if (!newConnectionMongoose) {
            throw new _appError_1.AppError('os-core:Error connecting to mongoose database', {
                errorKey: 'CONNECT_TO_DB_ERROR',
            });
        }
        this.mongoose = newConnectionMongoose;
    }
}
exports.DbConnectionNoSql = DbConnectionNoSql;
//# sourceMappingURL=DbConnectionNoSql.js.map