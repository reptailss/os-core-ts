"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
const core_1 = require("../core");
const User = () => {
    return (target, _propertyKey, _parameterIndex) => {
        core_1.ControllerDecoratorsBuilder.addArgToMethod({
            target,
            _propertyKey,
            arg: {
                key: 'User',
                _parameterIndex,
            },
        });
    };
};
exports.User = User;
//# sourceMappingURL=user.js.map