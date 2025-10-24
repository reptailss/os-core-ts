"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Inject = void 0;
require("reflect-metadata");
const _di_1 = require("../../di");
function Inject(token) {
    return (target, _propertyKey, parameterIndex) => {
        if (parameterIndex === undefined)
            return;
        const ctor = typeof target === 'function' ? target : target.constructor;
        const existing = Reflect.getMetadata(_di_1.DI_INJECT_KEY, ctor) || [];
        existing[parameterIndex] = token;
        Reflect.defineMetadata(_di_1.DI_INJECT_KEY, existing, ctor);
    };
}
exports.Inject = Inject;
//# sourceMappingURL=inject.js.map