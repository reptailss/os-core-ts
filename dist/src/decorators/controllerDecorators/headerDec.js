"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HeaderOptionalDec = exports.HeaderDec = void 0;
const core_1 = require("../core");
const HeaderDec = (key, schema) => {
    return function (target, _propertyKey, _parameterIndex) {
        core_1.ControllerDecoratorsBuilder.addArgToMethod({
            target,
            _propertyKey,
            arg: {
                _parameterIndex,
                schema,
                key: 'Header',
                fieldKey: key,
                required: true,
            },
        });
    };
};
exports.HeaderDec = HeaderDec;
const HeaderOptionalDec = (key, schema) => {
    return function (target, _propertyKey, _parameterIndex) {
        core_1.ControllerDecoratorsBuilder.addArgToMethod({
            target,
            _propertyKey,
            arg: {
                _parameterIndex,
                schema,
                key: 'Header',
                fieldKey: key,
                required: false,
            },
        });
    };
};
exports.HeaderOptionalDec = HeaderOptionalDec;
//# sourceMappingURL=headerDec.js.map