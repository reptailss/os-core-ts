"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ParamOptionalDec = exports.ParamDec = void 0;
const core_1 = require("../core");
const ParamDec = (key, schema) => {
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
exports.ParamDec = ParamDec;
const ParamOptionalDec = (key, schema) => {
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
exports.ParamOptionalDec = ParamOptionalDec;
//# sourceMappingURL=paramDec.js.map