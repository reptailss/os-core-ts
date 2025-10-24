"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PtpCoreUser = exports.PtpClientUser = void 0;
const core_1 = require("../core");
const PtpClientUser = (roles) => {
    return function (target, _propertyKey, _parameterIndex) {
        core_1.ControllerDecoratorsBuilder.addArgToMethod({
            target,
            _propertyKey,
            arg: {
                _parameterIndex,
                roles,
                key: 'PtpClientUser',
            },
        });
    };
};
exports.PtpClientUser = PtpClientUser;
const PtpCoreUser = (roles) => {
    return function (target, _propertyKey, _parameterIndex) {
        core_1.ControllerDecoratorsBuilder.addArgToMethod({
            target,
            _propertyKey,
            arg: {
                _parameterIndex,
                roles,
                key: 'PtpCoreUser',
            },
        });
    };
};
exports.PtpCoreUser = PtpCoreUser;
//# sourceMappingURL=ptpUser.js.map