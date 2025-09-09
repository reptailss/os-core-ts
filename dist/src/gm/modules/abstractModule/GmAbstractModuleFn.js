"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GmAbstractModuleFn = void 0;
const core_1 = require("../../core");
const _appError_1 = require("../../../appError");
class GmAbstractModuleFn extends core_1.GmAbstractModule {
    constructor() {
        super(...arguments);
        this.moduleType = 'fn';
        this.returnType = '';
        this.type = '';
        this.bodyElements = [];
        this.props = [];
        this.propsType = 'default';
        this.renderData = {};
        this.asyncType = 'sync';
        this.fileWriteModeGm = 'skipIfExists';
        this.dirType = 'modules';
    }
    getTemplatePath() {
        return 'modules/fn.ejs';
    }
    setType(type) {
        this.type = type;
        return this;
    }
    getType() {
        return this.type;
    }
    setReturnType(returnType) {
        this.returnType = returnType;
        return this;
    }
    getReturnType() {
        return this.returnType;
    }
    appendBodyElement(bodyElement) {
        this.bodyElements.push(bodyElement);
        return this;
    }
    prependBodyElement(bodyElement) {
        this.bodyElements.unshift(bodyElement);
        return this;
    }
    getBodyElements() {
        return this.bodyElements;
    }
    addProp(prop) {
        this.props.push(prop);
        return this;
    }
    getProps() {
        return this.props;
    }
    setPropsType(type) {
        this.propsType = type;
        return this;
    }
    getPropsType() {
        return this.propsType;
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
    setAsyncType(type) {
        this.asyncType = type;
        return this;
    }
    getAsyncType() {
        return this.asyncType;
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
exports.GmAbstractModuleFn = GmAbstractModuleFn;
//# sourceMappingURL=GmAbstractModuleFn.js.map