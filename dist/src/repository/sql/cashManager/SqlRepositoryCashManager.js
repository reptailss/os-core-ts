"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SqlRepositoryCashManager = void 0;
const repositories = {};
class SqlRepositoryCashManager {
    static saveToCash(key, repository) {
        repositories[key] = repository;
    }
    static getFromCash(key) {
        if (key in repositories) {
            return repositories[key];
        }
        return null;
    }
    static deleteFromCash(key) {
        if (key in repositories) {
            delete repositories[key];
        }
    }
    static getAllFromCash() {
        return repositories;
    }
}
exports.SqlRepositoryCashManager = SqlRepositoryCashManager;
//# sourceMappingURL=SqlRepositoryCashManager.js.map