"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ParamNumOptional = exports.ParamNum = void 0;
const core_1 = require("../core");
const ParamNum = (key, schema) => {
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
exports.ParamNum = ParamNum;
const ParamNumOptional = (key, schema) => {
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
exports.ParamNumOptional = ParamNumOptional;
//# sourceMappingURL=paramNum.js.map