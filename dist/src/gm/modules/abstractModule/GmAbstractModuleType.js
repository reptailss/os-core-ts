"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GmAbstractModuleType = void 0;
const core_1 = require("../../core");
const _appError_1 = require("../../../appError");
class GmAbstractModuleType extends core_1.GmAbstractModule {
    constructor() {
        super(...arguments);
        this.moduleType = 'type';
        this.renderData = {};
        this.body = '';
        this.fileWriteModeGm = 'skipIfExists';
        this.dirType = 'modules';
    }
    getTemplatePath() {
        return 'modules/type.ejs';
    }
    setBody(body) {
        this.body = body;
        return this;
    }
    getBody() {
        return this.body;
    }
    addRenderData(key, value) {
        this.renderData[key] = value;
        return this;
    }
    getRenderData(key) {
        if (!(key in this.renderData)) {
            throw new _appError_1.AppError(`Not found data ${key}`, {
                errorKey: 'SERVER_SIDE_ERROR',
            });
        }
        return this.renderData[key];
    }
    getExport() {
        const parentInfo = this.getParentInfo();
        if (!(parentInfo === null || parentInfo === void 0 ? void 0 : parentInfo.dirName)) {
            return {
                path: this.getFilePath(),
                propertyName: this.getPropertyName(),
            };
        }
        return {
            path: `${parentInfo.dirName}/${this.getFilePath()}`,
            propertyName: this.getPropertyName(),
        };
    }
    getFileWriteMode() {
        return this.fileWriteModeGm;
    }
    setDirType(dirType) {
        this.dirType = dirType;
        return this;
    }
    getDirType() {
        return this.dirType;
    }
    setFileWriteMode(mode) {
        this.fileWriteModeGm = mode;
        return this;
    }
    getFilePath() {
        const dirName = this.getDirName();
        if (!dirName) {
            return this.getFileName();
        }
        return `${dirName}/${this.getFileName()}`;
    }
    addChildModule(module) {
        const dirName = this.getDirName();
        if (dirName) {
            module.setParentInfo({
                dirName,
            });
        }
        return super.addChildModule(module);
    }
}
exports.GmAbstractModuleType = GmAbstractModuleType;
//# sourceMappingURL=GmAbstractModuleType.js.map