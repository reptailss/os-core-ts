"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LocaleDec = void 0;
const core_1 = require("../core");
const LocaleDec = (target, _propertyKey, _parameterIndex) => {
    core_1.ControllerDecoratorsBuilder.addArgToMethod({
        target,
        _propertyKey,
        arg: {
            _parameterIndex,
            key: 'Locale',
        },
    });
};
exports.LocaleDec = LocaleDec;
//# sourceMappingURL=localeDec.js.map