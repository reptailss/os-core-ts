"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LegalEntityIdByDomainDec = void 0;
const core_1 = require("../core");
const LegalEntityIdByDomainDec = (target, _propertyKey, _parameterIndex) => {
    core_1.ControllerDecoratorsBuilder.addArgToMethod({
        target,
        _propertyKey,
        arg: {
            _parameterIndex,
            key: 'LegalEntityIdByDomain',
        },
    });
};
exports.LegalEntityIdByDomainDec = LegalEntityIdByDomainDec;
//# sourceMappingURL=legalEntityIdByDomainDec.js.map