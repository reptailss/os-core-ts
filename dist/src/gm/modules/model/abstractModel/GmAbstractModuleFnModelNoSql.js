"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GmAbstractModuleFnModelNoSql = void 0;
const core_1 = require("../../../core");
const _helpers_1 = require("../../../../helpers");
class GmModuleDatabaseNameConstants extends core_1.GmModuleConstants {
    constructor(config, collectionName) {
        super({
            config,
            value: _helpers_1.StringCaseHelper.toSnakeCase(config.moduleName),
            propertyName: collectionName,
            mode: 'appendAfter',
        });
    }
}
class GmModuleCollectionNameConstants extends core_1.GmModuleConstants {
    constructor(config, databaseName) {
        super({
            config,
            value: _helpers_1.StringCaseHelper.toSnakeCase(config.moduleName),
            propertyName: databaseName,
            mode: 'appendAfter',
        });
    }
}
class GmAbstractModuleFnModelNoSql extends core_1.GmAbstractModuleFn {
    constructor(config) {
        super(config);
        this.gmModuleModelColumns = new core_1.GmModuleModelColumns(config);
        this.modelType = new core_1.GmModuleModelType(config);
        this.gmModuleDto = new core_1.GmModuleDto(config);
        this.gmModuleCollectionName = new GmModuleCollectionNameConstants(config, this.getCollectionName());
        this.gmModuleDatabaseName = new GmModuleDatabaseNameConstants(config, this.getDatabaseName());
    }
    getDirName() {
        return 'model';
    }
    getFileName() {
        return 'index.ts';
    }
    init() {
        this.setFileWriteMode('appendAfter');
        this.addModule(this.modelType, {
            hasAddImport: false,
        });
        this.addModule(this.gmModuleDto);
        this.addChildModule(this.gmModuleCollectionName);
        this.addChildModule(this.gmModuleDatabaseName);
        this.addChildModule(this.gmModuleModelColumns);
        this.addImport({
            path: 'os-core-ts',
            propertyName: 'LoaderModelNoSql',
            isLibImport: true,
        });
        this.addImport({
            path: 'os-core-ts',
            propertyName: 'IModelNoSql',
            isLibImport: true,
        });
    }
    getColumnsPropertyName() {
        return this.gmModuleModelColumns.getPropertyName();
    }
    getCollectionNamePropertyName() {
        return this.gmModuleCollectionName.getPropertyName();
    }
    getDatabaseNamePropertyName() {
        return this.gmModuleDatabaseName.getPropertyName();
    }
    getModelTypePropertyName() {
        return this.modelType.getPropertyName();
    }
    getCollectionName() {
        return `${_helpers_1.StringCaseHelper.toSnakeUpperCase(this.getConfig().dtoName.plural)}_COLLECTION_NAME`;
    }
    getDatabaseName() {
        return `${_helpers_1.StringCaseHelper.toSnakeUpperCase(this.getConfig().dtoName.plural)}_DATABASE_NAME`;
    }
}
exports.GmAbstractModuleFnModelNoSql = GmAbstractModuleFnModelNoSql;
//# sourceMappingURL=GmAbstractModuleFnModelNoSql.js.map