"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ImportStructureServiceEndpoint = void 0;
const core_1 = require("../core");
function ImportStructureServiceEndpoint(name, { key } = {}) {
    return function (target, _propertyKey, descriptor) {
        core_1.ControllerDecoratorsBuilder.addImportStructureServiceToMethod({
            target,
            key,
            name,
            _propertyKey,
        });
    };
}
exports.ImportStructureServiceEndpoint = ImportStructureServiceEndpoint;
//# sourceMappingURL=importStructureServiceEndpoint.js.map