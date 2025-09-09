"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GmBodyDec = void 0;
class GmBodyDec {
    constructor(schemaVarName) {
        this.schemaVarName = schemaVarName;
    }
    getDecoratorName() {
        return 'BodyDec';
    }
    getProps() {
        return [this.schemaVarName];
    }
    getImport() {
        return {
            propertyName: 'BodyDec',
            path: 'os-core-ts',
            isLibImport: true,
        };
    }
}
exports.GmBodyDec = GmBodyDec;
//# sourceMappingURL=GmBodyDec.js.map