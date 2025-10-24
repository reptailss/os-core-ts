"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HeaderParamOptional = exports.HeaderParam = void 0;
const core_1 = require("../core");
const HeaderParam = (key, schema) => {
    return function (target, _propertyKey, _parameterIndex) {
        core_1.ControllerDecoratorsBuilder.addArgToMethod({
            target,
            _propertyKey,
            arg: {
                _parameterIndex,
                schema,
                key: 'HeaderParam',
                fieldKey: key,
                required: true,
            },
        });
    };
};
exports.HeaderParam = HeaderParam;
const HeaderParamOptional = (key, schema) => {
    return function (target, _propertyKey, _parameterIndex) {
        core_1.ControllerDecoratorsBuilder.addArgToMethod({
            target,
            _propertyKey,
            arg: {
                _parameterIndex,
                schema,
                key: 'HeaderParam',
                fieldKey: key,
                required: false,
            },
        });
    };
};
exports.HeaderParamOptional = HeaderParamOptional;
//# sourceMappingURL=headerParam.js.map