"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ParamNumOptionalDec = exports.ParamNumDec = void 0;
const core_1 = require("../core");
const ParamNumDec = (key, schema) => {
    return function (target, _propertyKey, _parameterIndex) {
        core_1.ControllerDecoratorsBuilder.addArgToMethod({
            target,
            _propertyKey,
            arg: {
                _parameterIndex,
                schema: schema,
                key: 'ParamNum',
                fieldKey: key,
                required: true,
            },
        });
    };
};
exports.ParamNumDec = ParamNumDec;
const ParamNumOptionalDec = (key, schema) => {
    return function (target, _propertyKey, _parameterIndex) {
        core_1.ControllerDecoratorsBuilder.addArgToMethod({
            target,
            _propertyKey,
            arg: {
                _parameterIndex,
                schema: schema,
                key: 'ParamNum',
                fieldKey: key,
                required: false,
            },
        });
    };
};
exports.ParamNumOptionalDec = ParamNumOptionalDec;
//# sourceMappingURL=paramNumDec.js.map