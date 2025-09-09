"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GmRenderModuleClassMethod = void 0;
const core_1 = require("../core");
class GmRenderModuleClassMethod extends core_1.GmRenderModule {
    constructor(moduleClassMethod) {
        super(moduleClassMethod);
        this.moduleClassMethod = moduleClassMethod;
    }
    renderBody() {
        var _a, _b;
        if (!((_a = this.moduleClassMethod.getBodyElements()) === null || _a === void 0 ? void 0 : _a.length)) {
            return '';
        }
        return (_b = this.moduleClassMethod.getBodyElements().map((elem) => {
            if (elem.hasEmptyLineAtEnd) {
                return `${elem.value}\n`;
            }
            return elem.value;
        })) === null || _b === void 0 ? void 0 : _b.join('\n');
    }
    renderReturnType() {
        if (!this.moduleClassMethod.getReturnType()) {
            return '';
        }
        return `:${this.moduleClassMethod.getReturnType()}`;
    }
    getData(key) {
        return this.moduleClassMethod.getRenderData(key);
    }
    renderProps() {
        switch (this.moduleClassMethod.getPropsType()) {
            case 'default':
                return this.renderDefaultPropsType();
            case 'object':
                return this.renderObjectPropsType();
        }
    }
    renderAsyncType() {
        if (this.moduleClassMethod.getAsyncType() === 'async') {
            return 'async ';
        }
        return '';
    }
    renderScope() {
        return this.moduleClassMethod.getMethodScope();
    }
    renderDecorators() {
        if (!this.moduleClassMethod.getDecorators().length) {
            return '';
        }
        return this.moduleClassMethod.getDecorators().map((decorator) => {
            if (!decorator.getProps().length) {
                return `@${decorator.getDecoratorName()}`;
            }
            return `@${decorator.getDecoratorName()}(${decorator.getProps().join(',')})`;
        }).join('\n');
    }
    renderDefaultPropsType() {
        const res = [];
        if (this.moduleClassMethod.getProps().length) {
            this.moduleClassMethod.getProps().forEach((prop) => {
                const varName = prop.optional ? `${prop.varName}?` : prop.varName;
                const type = prop.nullable ? `${prop.type} | null` : prop.type;
                if (prop.decorator) {
                    res.push(`${this.renderPropDecorator(prop.decorator)} ${varName}:${type}`);
                }
                else {
                    res.push(`${varName}:${type}`);
                }
            });
        }
        if (this.moduleClassMethod.getPropDecorators().length) {
            this.moduleClassMethod.getPropDecorators().forEach((prop) => {
                const varName = prop.optional ? `${prop.varName}?` : prop.varName;
                const type = prop.nullable ? `${prop.type} | null` : prop.type;
                if (prop.decorator) {
                    res.push(`${this.renderPropDecorator(prop.decorator)} ${varName}:${type}`);
                }
                else {
                    res.push(`${varName}:${type}`);
                }
            });
        }
        return res.join(',');
    }
    renderObjectPropsType() {
        return `{${this.moduleClassMethod.getProps().map((prop) => prop.varName).join(',')}}:{${this.renderDefaultPropsType()}}`;
    }
    renderPropDecorator(decorator) {
        if (!decorator.getProps().length) {
            return `@${decorator.getDecoratorName()}`;
        }
        return `@${decorator.getDecoratorName()}(${decorator.getProps().join(',')})`;
    }
}
exports.GmRenderModuleClassMethod = GmRenderModuleClassMethod;
//# sourceMappingURL=GmRenderModuleClassMethod.js.map