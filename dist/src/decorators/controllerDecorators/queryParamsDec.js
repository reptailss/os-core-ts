"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.QueryParamsDec = void 0;
const core_1 = require("../core");
const QueryParamsDec = (schema) => {
    return function (target, _propertyKey, _parameterIndex) {
        core_1.ControllerDecoratorsBuilder.addArgToMethod({
            target,
            _propertyKey,
            arg: {
                _parameterIndex,
                schema,
                key: 'QueryParams',
            },
        });
    };
};
exports.QueryParamsDec = QueryParamsDec;
//# sourceMappingURL=queryParamsDec.js.map