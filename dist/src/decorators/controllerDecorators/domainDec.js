"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DomainDec = void 0;
const core_1 = require("../core");
const DomainDec = (target, _propertyKey, _parameterIndex) => {
    core_1.ControllerDecoratorsBuilder.addArgToMethod({
        target,
        _propertyKey,
        arg: {
            _parameterIndex,
            key: 'Domain',
        },
    });
};
exports.DomainDec = DomainDec;
//# sourceMappingURL=domainDec.js.map