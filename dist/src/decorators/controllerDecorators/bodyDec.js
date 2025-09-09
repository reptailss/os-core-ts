"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BodyDec = void 0;
const core_1 = require("../core");
const BodyDec = (schema) => {
    return function (target, _propertyKey, _parameterIndex) {
        core_1.ControllerDecoratorsBuilder.addArgToMethod({
            target,
            _propertyKey,
            arg: {
                _parameterIndex,
                schema,
                key: 'Body',
            },
        });
    };
};
exports.BodyDec = BodyDec;
//# sourceMappingURL=bodyDec.js.map