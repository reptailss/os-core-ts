"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GmModuleUpdateDto = void 0;
const core_1 = require("../../core");
const _helpers_1 = require("../../../helpers");
class GmModuleUpdateDto extends core_1.GmAbstractModuleType {
    constructor(config) {
        super(config);
        this.gmModuleCreateDto = new core_1.GmModuleCreateDto(config);
    }
    getPropertyName() {
        return `Update${_helpers_1.StringCaseHelper.toPascalCase(this.getConfig().dtoName.singular)}Dto`;
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
        this.setBody(`Partial<${this.gmModuleCreateDto.getPropertyName()}>`);
    }
}
exports.GmModuleUpdateDto = GmModuleUpdateDto;
//# sourceMappingURL=GmModuleUpdateDto.js.map