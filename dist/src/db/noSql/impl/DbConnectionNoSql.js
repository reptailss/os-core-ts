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
    constructor(databaseName, optionsDb) {
        this.dbConnectionMongoose = null;
        this.databaseName = databaseName;
        if (optionsDb) {
            this.optionsDb = optionsDb;
        }
    }
    async init() {
        const newMongoose = await mongoose_1.default.connect(core_1.DbConnectionNoSqlHelper.getDbUrl(core_1.DbConnectionNoSqlHelper.getDbOptions(this.optionsDb)));
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
        this.dbConnectionMongoose = newConnectionMongoose;
    }
    defineModel({ columns, collectionName, options, indexes, }) {
        if (!this.dbConnectionMongoose) {
            throw new _appError_1.AppError('os-core:Error connecting to mongoose database', {
                errorKey: 'SERVER_SIDE_ERROR',
            });
        }
        return new core_1.ModelNoSql({
            dbConnection: this.dbConnectionMongoose,
            collectionName,
            columns,
            indexes,
            options,
            databaseName: this.databaseName,
            optionsDb: this.optionsDb,
        });
    }
}
exports.DbConnectionNoSql = DbConnectionNoSql;
//# sourceMappingURL=DbConnectionNoSql.js.map