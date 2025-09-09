"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SetHeaderDec = void 0;
const core_1 = require("../core");
function SetHeaderDec(key, value) {
    return function (target, _propertyKey, descriptor) {
        const endpoints = target.constructor.endpoints || [];
        const endpoint = endpoints.find((endpoint) => endpoint._propertyKey === _propertyKey);
        if (!endpoint) {
            return;
        }
        core_1.ControllerDecoratorsBuilder.setHeaderToMethod({
            target,
            _propertyKey,
            key,
            value,
        });
    };
}
exports.SetHeaderDec = SetHeaderDec;
//# sourceMappingURL=setHeaderDec.js.map