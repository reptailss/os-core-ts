"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Res = void 0;
const core_1 = require("../core");
const Res = () => {
    return function (target, _propertyKey, _parameterIndex) {
        core_1.ControllerDecoratorsBuilder.addArgToMethod({
            target,
            _propertyKey,
            arg: {
                key: 'AppResponse',
                _parameterIndex,
            },
        });
    };
};
exports.Res = Res;
//# sourceMappingURL=response.js.map