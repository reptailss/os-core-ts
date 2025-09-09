"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PaginationQueryParamsDec = void 0;
const core_1 = require("../core");
const PaginationQueryParamsDec = (schema, options) => {
    return function (target, _propertyKey, _parameterIndex) {
        core_1.ControllerDecoratorsBuilder.addArgToMethod({
            target,
            _propertyKey,
            arg: {
                _parameterIndex,
                schema,
                key: 'PaginationQueryParams',
                in: (options === null || options === void 0 ? void 0 : options.in) || 'query'
            },
        });
    };
};
exports.PaginationQueryParamsDec = PaginationQueryParamsDec;
//# sourceMappingURL=paginationQueryParamsDec.js.map