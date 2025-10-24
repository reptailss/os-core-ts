"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppFormDataParamOptional = exports.AppFormDataParam = void 0;
const core_1 = require("../core");
const AppFormDataParam = (key, schema) => {
    return function (target, _propertyKey, _parameterIndex) {
        core_1.ControllerDecoratorsBuilder.addArgToMethod({
            target,
            _propertyKey,
            arg: {
                _parameterIndex,
                schema: schema,
                key: 'AppFormDataParam',
                fieldKey: key,
                required: true,
            },
        });
    };
};
exports.AppFormDataParam = AppFormDataParam;
const AppFormDataParamOptional = (key, schema) => {
    return function (target, _propertyKey, _parameterIndex) {
        core_1.ControllerDecoratorsBuilder.addArgToMethod({
            target,
            _propertyKey,
            arg: {
                _parameterIndex,
                schema: schema,
                key: 'AppFormDataParam',
                fieldKey: key,
                required: false,
            },
        });
    };
};
exports.AppFormDataParamOptional = AppFormDataParamOptional;
//# sourceMappingURL=appFormDataParam.js.map