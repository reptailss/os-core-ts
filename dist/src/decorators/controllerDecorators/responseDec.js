"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppResponseDec = void 0;
const core_1 = require("../core");
const AppResponseDec = (target, _propertyKey, _parameterIndex) => {
    core_1.ControllerDecoratorsBuilder.addArgToMethod({
        target,
        _propertyKey,
        arg: {
            key: 'AppResponse',
            _parameterIndex,
        },
    });
};
exports.AppResponseDec = AppResponseDec;
//# sourceMappingURL=responseDec.js.map