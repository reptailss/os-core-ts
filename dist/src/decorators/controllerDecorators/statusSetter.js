"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StatusSetter = void 0;
const core_1 = require("../core");
const StatusSetter = () => {
    return (target, _propertyKey, _parameterIndex) => {
        core_1.ControllerDecoratorsBuilder.addArgToMethod({
            target,
            _propertyKey,
            arg: {
                key: 'SetResponseStatus',
                _parameterIndex,
            },
        });
    };
};
exports.StatusSetter = StatusSetter;
//# sourceMappingURL=statusSetter.js.map