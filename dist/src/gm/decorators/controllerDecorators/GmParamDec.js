"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GmParamDec = exports.GmParamNumDec = void 0;
class GmParamNumDec {
    constructor(key) {
        this.key = key;
    }
    getDecoratorName() {
        return 'ParamNumDec';
    }
    getProps() {
        return [`'${this.key}'`];
    }
    getImport() {
        return {
            propertyName: 'ParamNumDec',
            path: 'os-core-ts',
            isLibImport: true,
        };
    }
}
exports.GmParamNumDec = GmParamNumDec;
class GmParamDec {
    constructor(key) {
        this.key = key;
    }
    getDecoratorName() {
        return 'ParamDec';
    }
    getProps() {
        return [`'${this.key}'`];
    }
    getImport() {
        return {
            propertyName: 'ParamDec',
            path: 'os-core-ts',
            isLibImport: true,
        };
    }
}
exports.GmParamDec = GmParamDec;
//# sourceMappingURL=GmParamDec.js.map