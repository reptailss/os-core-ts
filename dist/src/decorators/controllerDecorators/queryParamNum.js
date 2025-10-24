"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.QueryParamNumOptional = exports.QueryParamNum = void 0;
const core_1 = require("../core");
const QueryParamNum = (key, schema) => {
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
exports.QueryParamNum = QueryParamNum;
const QueryParamNumOptional = (key, schema) => {
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
exports.QueryParamNumOptional = QueryParamNumOptional;
//# sourceMappingURL=queryParamNum.js.map