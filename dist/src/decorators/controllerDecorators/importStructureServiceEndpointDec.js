"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ImportStructureServiceEndpointDec = void 0;
const core_1 = require("../core");
function ImportStructureServiceEndpointDec(name, { key } = {}) {
    return function (target, _propertyKey, descriptor) {
        core_1.ControllerDecoratorsBuilder.addImportStructureServiceToMethod({
            target,
            key,
            name,
            _propertyKey,
        });
    };
}
exports.ImportStructureServiceEndpointDec = ImportStructureServiceEndpointDec;
//# sourceMappingURL=importStructureServiceEndpointDec.js.map