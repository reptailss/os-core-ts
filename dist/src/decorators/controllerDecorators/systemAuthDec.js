"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SystemAuthDec = void 0;
const core_1 = require("../core");
const SystemAuthDec = (target, _propertyKey, _parameterIndex) => {
    core_1.ControllerDecoratorsBuilder.addArgToMethod({
        target,
        _propertyKey,
        arg: {
            key: 'SystemAuth',
            _parameterIndex,
        },
    });
};
exports.SystemAuthDec = SystemAuthDec;
//# sourceMappingURL=systemAuthDec.js.map