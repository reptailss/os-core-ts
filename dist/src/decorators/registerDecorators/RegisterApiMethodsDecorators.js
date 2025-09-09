"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RegisterApiMethodsDecorators = void 0;
class RegisterApiMethodsDecorators {
    static registerMethodDecorator({ path, type, method, target, propertyKey, }) {
        if (!target.constructor.endpoints) {
            target.constructor.endpoints = [];
        }
        target.constructor.endpoints.push({
            method: method,
            path,
            _propertyKey: propertyKey,
            type,
        });
    }
}
exports.RegisterApiMethodsDecorators = RegisterApiMethodsDecorators;
//# sourceMappingURL=RegisterApiMethodsDecorators.js.map