"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SqlRepositoryDynamicRegistry = void 0;
class SqlRepositoryDynamicRegistry {
    constructor() {
        this.repositories = [];
    }
    register(repository) {
        this.repositories.push(repository);
        return this;
    }
    getRepositories() {
        return this.repositories;
    }
}
exports.SqlRepositoryDynamicRegistry = SqlRepositoryDynamicRegistry;
//# sourceMappingURL=SqlRepositoryDynamicRegistry.js.map