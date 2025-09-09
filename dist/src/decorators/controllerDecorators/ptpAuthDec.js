"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PtpCoreAuthDec = exports.PtpClientAuthDec = void 0;
const core_1 = require("../core");
const PtpClientAuthDec = (roles) => {
    return function (target, _propertyKey, _parameterIndex) {
        core_1.ControllerDecoratorsBuilder.addArgToMethod({
            target,
            _propertyKey,
            arg: {
                _parameterIndex,
                roles,
                key: 'PtpClientAuth',
            },
        });
    };
};
exports.PtpClientAuthDec = PtpClientAuthDec;
const PtpCoreAuthDec = (roles) => {
    return function (target, _propertyKey, _parameterIndex) {
        core_1.ControllerDecoratorsBuilder.addArgToMethod({
            target,
            _propertyKey,
            arg: {
                _parameterIndex,
                roles,
                key: 'PtpCoreAuth',
            },
        });
    };
};
exports.PtpCoreAuthDec = PtpCoreAuthDec;
//# sourceMappingURL=ptpAuthDec.js.map