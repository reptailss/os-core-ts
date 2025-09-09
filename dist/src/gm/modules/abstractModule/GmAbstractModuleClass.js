"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GmAbstractModuleClass = void 0;
const core_1 = require("../../core");
const _appError_1 = require("../../../appError");
class GmAbstractModuleClass extends core_1.GmAbstractModule {
    constructor() {
        super(...arguments);
        this.moduleType = 'class';
        this.constructorProps = [];
        this.methods = [];
        this.decorators = [];
        this.vars = [];
        this.elementsBeforeClass = [];
        this.fileWriteModeGm = 'skipIfExists';
        this.dirType = 'modules';
    }
    getTemplatePath() {
        return 'modules/class.ejs';
    }
    addConstructorProp(constructorProp) {
        this.constructorProps.push(constructorProp);
        return this;
    }
    getConstructorProps() {
        return this.constructorProps;
    }
    addMethod(method) {
        method.init();
        if (method.getImports().length) {
            method.getImports().forEach(imp => {
                this.addImport(imp);
            });
        }
        this.methods.push(method);
        return this;
    }
    getMethods() {
        return this.methods;
    }
    getMethodByIndex(index) {
        if (index > this.getMethods().length - 1) {
            throw new _appError_1.AppError('Not found method by index');
        }
        return this.getMethods()[index];
    }
    addDecorator(decorator) {
        this.decorators.push(decorator);
        this.addImport(decorator.getImport());
        return this;
    }
    getDecorators() {
        return this.decorators;
    }
    addService(service) {
        if (service.serviceType === 'class') {
            this.addConstructorProp(service.getConstructorProp());
        }
        return super.addService(service);
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
    addVar(gmVar) {
        this.vars.push(gmVar);
        return this;
    }
    getVars() {
        return this.vars;
    }
    addElementBeforeClass(value) {
        this.elementsBeforeClass.push(value);
        return this;
    }
    getElementsBeforeClass() {
        return this.elementsBeforeClass;
    }
}
exports.GmAbstractModuleClass = GmAbstractModuleClass;
//# sourceMappingURL=GmAbstractModuleClass.js.map