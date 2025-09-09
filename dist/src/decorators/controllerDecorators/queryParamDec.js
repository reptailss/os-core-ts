"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.QueryParamOptionalDec = exports.QueryParamDec = void 0;
const core_1 = require("../core");
const QueryParamDec = (key, schema) => {
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
exports.QueryParamDec = QueryParamDec;
const QueryParamOptionalDec = (key, schema) => {
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
exports.QueryParamOptionalDec = QueryParamOptionalDec;
//# sourceMappingURL=queryParamDec.js.map