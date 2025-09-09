"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GmServiceObjectSchemaValidatorType = void 0;
const core_1 = require("../../core");
class GmServiceObjectSchemaValidatorType extends core_1.GmAbstractServiceFn {
    getExport() {
        return {
            path: 'os-core-ts',
            propertyName: 'ObjectSchemaValidator',
            isLibImport: true,
        };
    }
    getServiceName() {
        return 'ObjectSchemaValidator';
    }
    getSchemaValidatorType(baseType) {
        return `ObjectSchemaValidator<${baseType}>`;
    }
}
exports.GmServiceObjectSchemaValidatorType = GmServiceObjectSchemaValidatorType;
//# sourceMappingURL=GmServiceObjectSchemaValidatorType.js.map