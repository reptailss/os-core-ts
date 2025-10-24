"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.QueryParams = void 0;
const core_1 = require("../core");
const QueryParams = (schema) => {
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
exports.QueryParams = QueryParams;
//# sourceMappingURL=queryParams.js.map