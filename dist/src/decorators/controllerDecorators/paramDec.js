"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ParamOptional = exports.Param = void 0;
const core_1 = require("../core");
const Param = (key, schema) => {
    return function (target, _propertyKey, _parameterIndex) {
        core_1.ControllerDecoratorsBuilder.addArgToMethod({
            target,
            _propertyKey,
            arg: {
                _parameterIndex,
                schema: schema,
                key: 'Param',
                fieldKey: key,
                required: true,
            },
        });
    };
};
exports.Param = Param;
const ParamOptional = (key, schema) => {
    return function (target, _propertyKey, _parameterIndex) {
        core_1.ControllerDecoratorsBuilder.addArgToMethod({
            target,
            _propertyKey,
            arg: {
                _parameterIndex,
                schema: schema,
                key: 'Param',
                fieldKey: key,
                required: false,
            },
        });
    };
};
exports.ParamOptional = ParamOptional;
//# sourceMappingURL=paramDec.js.map