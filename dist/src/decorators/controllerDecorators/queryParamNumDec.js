"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.QueryParamNumOptionalDec = exports.QueryParamNumDec = void 0;
const core_1 = require("../core");
const QueryParamNumDec = (key, schema) => {
    return function (target, _propertyKey, _parameterIndex) {
        core_1.ControllerDecoratorsBuilder.addArgToMethod({
            target,
            _propertyKey,
            arg: {
                _parameterIndex,
                schema,
                key: 'QueryParamNum',
                fieldKey: key,
                required: true,
            },
        });
    };
};
exports.QueryParamNumDec = QueryParamNumDec;
const QueryParamNumOptionalDec = (key, schema) => {
    return function (target, _propertyKey, _parameterIndex) {
        core_1.ControllerDecoratorsBuilder.addArgToMethod({
            target,
            _propertyKey,
            arg: {
                _parameterIndex,
                schema,
                key: 'QueryParamNum',
                fieldKey: key,
                required: false,
            },
        });
    };
};
exports.QueryParamNumOptionalDec = QueryParamNumOptionalDec;
//# sourceMappingURL=queryParamNumDec.js.map