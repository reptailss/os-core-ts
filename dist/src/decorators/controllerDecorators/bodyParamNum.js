"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BodyParamNumOptional = exports.BodyParamNum = void 0;
const core_1 = require("../core");
const BodyParamNum = (key, schema) => {
    return function (target, _propertyKey, _parameterIndex) {
        core_1.ControllerDecoratorsBuilder.addArgToMethod({
            target,
            _propertyKey,
            arg: {
                _parameterIndex,
                schema: schema,
                key: 'BodyParamNum',
                fieldKey: key,
                required: true,
            },
        });
    };
};
exports.BodyParamNum = BodyParamNum;
const BodyParamNumOptional = (key, schema) => {
    return function (target, _propertyKey, _parameterIndex) {
        core_1.ControllerDecoratorsBuilder.addArgToMethod({
            target,
            _propertyKey,
            arg: {
                _parameterIndex,
                schema: schema,
                key: 'BodyParamNum',
                fieldKey: key,
                required: false,
            },
        });
    };
};
exports.BodyParamNumOptional = BodyParamNumOptional;
//# sourceMappingURL=bodyParamNum.js.map