"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FormDataDec = void 0;
const core_1 = require("../core");
const FormDataDec = (schema) => {
    return function (target, _propertyKey, _parameterIndex) {
        core_1.ControllerDecoratorsBuilder.addArgToMethod({
            target,
            _propertyKey,
            arg: {
                _parameterIndex,
                schema,
                key: 'FormData',
            },
        });
    };
};
exports.FormDataDec = FormDataDec;
//# sourceMappingURL=formDataDec.js.map