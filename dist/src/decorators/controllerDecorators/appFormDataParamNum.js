"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppFormDataParamNumOptional = exports.AppFormDataParamNum = void 0;
const core_1 = require("../core");
const AppFormDataParamNum = (key, schema) => {
    return function (target, _propertyKey, _parameterIndex) {
        core_1.ControllerDecoratorsBuilder.addArgToMethod({
            target,
            _propertyKey,
            arg: {
                _parameterIndex,
                schema: schema,
                key: 'AppFormDataParamNum',
                fieldKey: key,
                required: true,
            },
        });
    };
};
exports.AppFormDataParamNum = AppFormDataParamNum;
const AppFormDataParamNumOptional = (key, schema) => {
    return function (target, _propertyKey, _parameterIndex) {
        core_1.ControllerDecoratorsBuilder.addArgToMethod({
            target,
            _propertyKey,
            arg: {
                _parameterIndex,
                schema: schema,
                key: 'AppFormDataParamNum',
                fieldKey: key,
                required: false,
            },
        });
    };
};
exports.AppFormDataParamNumOptional = AppFormDataParamNumOptional;
//# sourceMappingURL=appFormDataParamNum.js.map