"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GmServiceSchemaValidatorType = void 0;
const core_1 = require("../../core");
class GmServiceSchemaValidatorType extends core_1.GmAbstractServiceFn {
    getExport() {
        return {
            path: 'os-core-ts',
            propertyName: 'SchemaValidator',
            isLibImport: true,
        };
    }
    getServiceName() {
        return 'SchemaValidator';
    }
    getSchemaValidatorType(baseType) {
        return `SchemaValidator<${baseType}>`;
    }
}
exports.GmServiceSchemaValidatorType = GmServiceSchemaValidatorType;
//# sourceMappingURL=GmServiceSchemaValidatorType.js.map