"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ParamsDec = void 0;
const core_1 = require("../core");
const ParamsDec = (schema) => {
    return function (target, _propertyKey, _parameterIndex) {
        core_1.ControllerDecoratorsBuilder.addArgToMethod({
            target,
            _propertyKey,
            arg: {
                _parameterIndex,
                schema: schema,
                key: 'Params',
            },
        });
    };
};
exports.ParamsDec = ParamsDec;
//# sourceMappingURL=paramsDec.js.map