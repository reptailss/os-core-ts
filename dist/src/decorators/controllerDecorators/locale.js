"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppLocale = void 0;
const core_1 = require("../core");
const AppLocale = () => {
    return (target, _propertyKey, _parameterIndex) => {
        core_1.ControllerDecoratorsBuilder.addArgToMethod({
            target,
            _propertyKey,
            arg: {
                _parameterIndex,
                key: 'Locale',
            },
        });
    };
};
exports.AppLocale = AppLocale;
//# sourceMappingURL=locale.js.map