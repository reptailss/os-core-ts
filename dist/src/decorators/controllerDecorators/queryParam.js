"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.QueryParamOptional = exports.QueryParam = void 0;
const core_1 = require("../core");
const QueryParam = (key, schema) => {
    return function (target, _propertyKey, _parameterIndex) {
        core_1.ControllerDecoratorsBuilder.addArgToMethod({
            target,
            _propertyKey,
            arg: {
                _parameterIndex,
                schema,
                key: 'QueryParam',
                fieldKey: key,
                required: true,
            },
        });
    };
};
exports.QueryParam = QueryParam;
const QueryParamOptional = (key, schema) => {
    return function (target, _propertyKey, _parameterIndex) {
        core_1.ControllerDecoratorsBuilder.addArgToMethod({
            target,
            _propertyKey,
            arg: {
                _parameterIndex,
                schema,
                key: 'QueryParam',
                fieldKey: key,
                required: false,
            },
        });
    };
};
exports.QueryParamOptional = QueryParamOptional;
//# sourceMappingURL=queryParam.js.map