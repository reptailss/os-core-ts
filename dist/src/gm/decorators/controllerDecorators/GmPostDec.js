"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GmPostDec = void 0;
class GmPostDec {
    constructor(url) {
        this.url = url;
    }
    getDecoratorName() {
        return 'PostDec';
    }
    getProps() {
        return [this.url];
    }
    getImport() {
        return {
            propertyName: 'PostDec',
            path: 'os-core-ts',
            isLibImport: true,
        };
    }
}
exports.GmPostDec = GmPostDec;
//# sourceMappingURL=GmPostDec.js.map