"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthDec = void 0;
const core_1 = require("../core");
const AuthDec = (target, _propertyKey, _parameterIndex) => {
    core_1.ControllerDecoratorsBuilder.addArgToMethod({
        target,
        _propertyKey,
        arg: {
            key: 'Auth',
            _parameterIndex,
        },
    });
};
exports.AuthDec = AuthDec;
//# sourceMappingURL=authDec.js.map