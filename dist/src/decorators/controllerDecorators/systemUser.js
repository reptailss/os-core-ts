"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SystemUser = void 0;
const core_1 = require("../core");
const SystemUser = () => {
    return (target, _propertyKey, _parameterIndex) => {
        core_1.ControllerDecoratorsBuilder.addArgToMethod({
            target,
            _propertyKey,
            arg: {
                _parameterIndex,
                key: 'SystemUser',
            },
        });
    };
};
exports.SystemUser = SystemUser;
//# sourceMappingURL=systemUser.js.map