"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.QueryParamDateOptional = exports.QueryParamDate = void 0;
const core_1 = require("../core");
const QueryParamDate = (key, schema) => {
    return function (target, _propertyKey, _parameterIndex) {
        core_1.ControllerDecoratorsBuilder.addArgToMethod({
            target,
            _propertyKey,
            arg: {
                _parameterIndex,
                schema,
                key: 'QueryParamDate',
                fieldKey: key,
                required: true,
            },
        });
    };
};
exports.QueryParamDate = QueryParamDate;
const QueryParamDateOptional = (key, schema) => {
    return function (target, _propertyKey, _parameterIndex) {
        core_1.ControllerDecoratorsBuilder.addArgToMethod({
            target,
            _propertyKey,
            arg: {
                _parameterIndex,
                schema,
                key: 'QueryParamDate',
                fieldKey: key,
                required: false,
            },
        });
    };
};
exports.QueryParamDateOptional = QueryParamDateOptional;
//# sourceMappingURL=queryParamDate.js.map