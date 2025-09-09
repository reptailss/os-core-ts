"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HeadersDec = void 0;
const core_1 = require("../core");
const HeadersDec = (schema) => {
    return function (target, _propertyKey, _parameterIndex) {
        core_1.ControllerDecoratorsBuilder.addArgToMethod({
            target,
            _propertyKey,
            arg: {
                _parameterIndex,
                schema: schema,
                key: 'Headers',
            },
        });
    };
};
exports.HeadersDec = HeadersDec;
//# sourceMappingURL=headersDec.js.map