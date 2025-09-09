"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GmModuleCreateDto = void 0;
const core_1 = require("../../core");
const _helpers_1 = require("../../../helpers");
class GmModuleCreateDto extends core_1.GmAbstractModuleType {
    constructor() {
        super(...arguments);
        this.generateDtoByColumns = () => {
            const res = [];
            for (const key in this.getConfig().model.columns) {
                const column = this.getConfig().model.columns[key];
                res.push({
                    key,
                    type: core_1.GmModuleDtoHelper.getTypeByColumn(column.type),
                    columnType: column.type,
                });
            }
            return res;
        };
    }
    getPropertyName() {
        return `Create${_helpers_1.StringCaseHelper.toPascalCase(this.getConfig().dtoName.singular)}Dto`;
    }
    getDirName() {
        return 'dto';
    }
    getFileName() {
        return 'index.ts';
    }
    init() {
        var _a;
        this.addRenderData('fields', this.generateDtoByColumns());
        this.setBody(`{
            ${(_a = this.generateDtoByColumns().map((field) => {
            return `${field.key}:${field.type}`;
        })) === null || _a === void 0 ? void 0 : _a.join('\n')}
        }`);
    }
}
exports.GmModuleCreateDto = GmModuleCreateDto;
//# sourceMappingURL=GmModuleCreateDto.js.map