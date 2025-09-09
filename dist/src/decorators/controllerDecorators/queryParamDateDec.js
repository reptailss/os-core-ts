"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.QueryParamDateOptionalDec = exports.QueryParamDateDec = void 0;
const core_1 = require("../core");
const QueryParamDateDec = (key, schema) => {
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
exports.QueryParamDateDec = QueryParamDateDec;
const QueryParamDateOptionalDec = (key, schema) => {
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
exports.QueryParamDateOptionalDec = QueryParamDateOptionalDec;
//# sourceMappingURL=queryParamDateDec.js.map