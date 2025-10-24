"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PaginationParams = void 0;
const core_1 = require("../core");
const PaginationParams = (schema, options) => {
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
exports.PaginationParams = PaginationParams;
//# sourceMappingURL=paginationQueryParams.js.map