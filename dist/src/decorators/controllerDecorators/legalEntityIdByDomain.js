"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LegalEntityIdByDomain = void 0;
const core_1 = require("../core");
const LegalEntityIdByDomain = () => {
    return (target, _propertyKey, _parameterIndex) => {
        core_1.ControllerDecoratorsBuilder.addArgToMethod({
            target,
            _propertyKey,
            arg: {
                _parameterIndex,
                key: 'LegalEntityIdByDomain',
            },
        });
    };
};
exports.LegalEntityIdByDomain = LegalEntityIdByDomain;
//# sourceMappingURL=legalEntityIdByDomain.js.map