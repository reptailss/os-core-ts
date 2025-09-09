"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GmGetDec = void 0;
class GmGetDec {
    constructor(url) {
        this.url = url;
    }
    getDecoratorName() {
        return 'GetDec';
    }
    getProps() {
        return [this.url];
    }
    getImport() {
        return {
            propertyName: 'GetDec',
            path: 'os-core-ts',
            isLibImport: true,
        };
    }
}
exports.GmGetDec = GmGetDec;
//# sourceMappingURL=GmGetDec.js.map