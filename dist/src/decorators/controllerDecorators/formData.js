"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppFormData = void 0;
const core_1 = require("../core");
const AppFormData = (schema) => {
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
exports.AppFormData = AppFormData;
//# sourceMappingURL=formData.js.map