"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GmAbstractModuleClassMethod = void 0;
const core_1 = require("../../core");
const _appError_1 = require("../../../appError");
class GmAbstractModuleClassMethod extends core_1.GmAbstractModule {
    constructor() {
        super(...arguments);
        this.moduleType = 'classMethod';
        this.returnType = '';
        this.bodyElements = [];
        this.decorators = [];
        this.propDecorators = [];
        this.props = [];
        this.propsType = 'default';
        this.renderData = {};
        this.asyncType = 'sync';
        this.scope = 'public';
    }
    getTemplatePath() {
        return 'modules/classMethod.ejs';
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
    getBodyElements() {
        return this.bodyElements;
    }
    prependBodyElement(bodyElement) {
        this.bodyElements.unshift(bodyElement);
        return this;
    }
    addProp(prop) {
        this.props.push(prop);
        if (prop.decorator) {
            this.addImport(prop.decorator.getImport());
        }
        return this;
    }
    appendPropDecorator(propDecorator) {
        this.addImport(propDecorator.decorator.getImport());
        this.propDecorators.push(propDecorator);
        return this;
    }
    getPropDecorators() {
        return this.propDecorators;
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
    appendDecorator(decorator, prepend = false) {
        this.decorators.push(decorator);
        this.addImport(decorator.getImport());
        return this;
    }
    prependDecorator(decorator, prepend = false) {
        this.decorators.unshift(decorator);
        this.addImport(decorator.getImport());
        return this;
    }
    getDecorators() {
        return this.decorators;
    }
    setMethodScope(scope) {
        this.scope = scope;
        return this;
    }
    getMethodScope() {
        return this.scope;
    }
    setAsyncType(type) {
        this.asyncType = type;
        return this;
    }
    getAsyncType() {
        return this.asyncType;
    }
    renderMethodCall() {
        return `${this.getPropertyName()}(${this.renderMethodCallProps()})`;
    }
    renderMethodCallProps() {
        if (!this.getProps().length) {
            return '';
        }
        switch (this.getPropsType()) {
            case 'default':
                return this.renderDefaultCallPropsType();
            case 'object':
                return this.renderObjectCallPropsType();
        }
    }
    renderDefaultCallPropsType() {
        var _a;
        return (_a = this.getProps().map((prop) => {
            return prop.callVarName;
        })) === null || _a === void 0 ? void 0 : _a.join(',');
    }
    renderObjectCallPropsType() {
        return `{${this.getProps().map((prop) => {
            if (prop.callVarName === prop.varName) {
                return prop.callVarName;
            }
            return `${prop.varName}:${prop.callVarName}`;
        }).join(',')}}`;
    }
}
exports.GmAbstractModuleClassMethod = GmAbstractModuleClassMethod;
//# sourceMappingURL=GmAbstractModuleClassMethod.js.map