"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GmAbstractModuleConstantModelSql = void 0;
const core_1 = require("../../../core");
const _helpers_1 = require("../../../../helpers");
class GmModuleTableNameConstants extends core_1.GmModuleConstants {
}
class GmAbstractModuleConstantModelSql extends core_1.GmAbstractModuleConstant {
    constructor(config) {
        super(config);
        this.gmModuleModelColumns = new core_1.GmModuleModelColumns(config);
        this.modelType = new core_1.GmModuleModelType(config);
        this.gmModuleDto = new core_1.GmModuleDto(config);
        this.gmModuleTableName = new GmModuleTableNameConstants({
            config,
            value: _helpers_1.StringCaseHelper.toSnakeCase(config.moduleName),
            propertyName: this.getTableName(),
        });
    }
    getDirName() {
        return 'model';
    }
    getFileName() {
        return 'index.ts';
    }
    init() {
        this.setFileWriteMode('appendAfter');
        this.addChildModule(this.gmModuleModelColumns);
        this.addModule(this.gmModuleDto);
        this.addModule(this.modelType, {
            hasAddImport: false,
        });
        this.addChildModule(this.gmModuleTableName);
        this.addImport({
            path: 'os-core-ts',
            propertyName: 'LoaderModelSql',
            isLibImport: true,
        });
        this.addImport({
            path: 'os-core-ts',
            propertyName: 'IModelSql',
            isLibImport: true,
        });
    }
    getTableNamePropertyName() {
        return this.gmModuleTableName.getPropertyName();
    }
    getColumnsPropertyName() {
        return this.gmModuleModelColumns.getPropertyName();
    }
    getModelTypePropertyName() {
        return this.modelType.getPropertyName();
    }
    getTableName() {
        return `${_helpers_1.StringCaseHelper.toSnakeUpperCase(this.getConfig().dtoName.plural)}_TABLE_NAME`;
    }
}
exports.GmAbstractModuleConstantModelSql = GmAbstractModuleConstantModelSql;
//# sourceMappingURL=GmAbstractModuleConstantModelSql.js.map