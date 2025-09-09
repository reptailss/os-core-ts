"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GmQueryParamDateDec = exports.GmQueryParamDec = exports.GmQueryParamNumDec = void 0;
class GmQueryParamNumDec {
    constructor(key) {
        this.key = key;
    }
    getDecoratorName() {
        return 'QueryParamNumDec';
    }
    getProps() {
        return [`'${this.key}'`];
    }
    getImport() {
        return {
            propertyName: 'QueryParamNumDec',
            path: 'os-core-ts',
            isLibImport: true,
        };
    }
}
exports.GmQueryParamNumDec = GmQueryParamNumDec;
class GmQueryParamDec {
    constructor(key) {
        this.key = key;
    }
    getDecoratorName() {
        return 'QueryParamDec';
    }
    getProps() {
        return [`'${this.key}'`];
    }
    getImport() {
        return {
            propertyName: 'QueryParamDec',
            path: 'os-core-ts',
            isLibImport: true,
        };
    }
}
exports.GmQueryParamDec = GmQueryParamDec;
class GmQueryParamDateDec {
    constructor(key) {
        this.key = key;
    }
    getDecoratorName() {
        return 'QueryParamDateDec';
    }
    getProps() {
        return [`'${this.key}'`];
    }
    getImport() {
        return {
            propertyName: 'QueryParamDateDec',
            path: 'os-core-ts',
            isLibImport: true,
        };
    }
}
exports.GmQueryParamDateDec = GmQueryParamDateDec;
//# sourceMappingURL=GmQueryParamDec.js.map