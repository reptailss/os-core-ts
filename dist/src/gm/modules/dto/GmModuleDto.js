"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GmModuleDto = void 0;
const core_1 = require("../../core");
const _helpers_1 = require("../../../helpers");
class GmModuleDto extends core_1.GmAbstractModuleType {
    constructor(config) {
        super(config);
        this.gmModuleCreateDto = new core_1.GmModuleCreateDto(config);
    }
    getPropertyName() {
        return `${_helpers_1.StringCaseHelper.toPascalCase(this.getConfig().dtoName.singular)}Dto`;
    }
    getDirName() {
        return this.gmModuleCreateDto.getDirName();
    }
    getFileName() {
        return this.gmModuleCreateDto.getFileName();
    }
    init() {
        this.addModule(this.gmModuleCreateDto, {
            hasAddImport: false,
        });
        this.setFileWriteMode('appendBefore');
        this.setBody(`
        ${this.gmModuleCreateDto.getPropertyName()} & {
            ${core_1.GmModuleDtoHelper.getDtoPrimaryKeyByConfig(this.getConfig()).key}:${core_1.GmModuleDtoHelper.getDtoPrimaryKeyByConfig(this.getConfig()).type},
            date_add:Date,
            date_update:Date,
        }`);
    }
}
exports.GmModuleDto = GmModuleDto;
//# sourceMappingURL=GmModuleDto.js.map