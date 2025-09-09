"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GmPutDec = void 0;
class GmPutDec {
    constructor(url) {
        this.url = url;
    }
    getDecoratorName() {
        return 'PutDec';
    }
    getProps() {
        return [this.url];
    }
    getImport() {
        return {
            propertyName: 'PutDec',
            path: 'os-core-ts',
            isLibImport: true,
        };
    }
}
exports.GmPutDec = GmPutDec;
//# sourceMappingURL=GmPutDec.js.map