"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BodyParamOptional = exports.BodyParam = void 0;
const core_1 = require("../core");
const BodyParam = (key, schema) => {
    return function (target, _propertyKey, _parameterIndex) {
        core_1.ControllerDecoratorsBuilder.addArgToMethod({
            target,
            _propertyKey,
            arg: {
                _parameterIndex,
                schema: schema,
                key: 'BodyParam',
                fieldKey: key,
                required: true,
            },
        });
    };
};
exports.BodyParam = BodyParam;
const BodyParamOptional = (key, schema) => {
    return function (target, _propertyKey, _parameterIndex) {
        core_1.ControllerDecoratorsBuilder.addArgToMethod({
            target,
            _propertyKey,
            arg: {
                _parameterIndex,
                schema: schema,
                key: 'BodyParam',
                fieldKey: key,
                required: false,
            },
        });
    };
};
exports.BodyParamOptional = BodyParamOptional;
//# sourceMappingURL=bodyParam.js.map