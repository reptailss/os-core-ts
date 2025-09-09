"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ControllerDecoratorsBuilder = void 0;
class ControllerDecoratorsBuilder {
    static addArgToMethod({ target, _propertyKey, arg, }) {
        if (!target.constructor.args) {
            target.constructor.args = {};
        }
        const allArgs = target.constructor.args;
        if (!(_propertyKey in allArgs)) {
            allArgs[_propertyKey] = [];
        }
        const args = allArgs[_propertyKey];
        args.unshift(arg);
    }
    static addImportStructureServiceToMethod({ target, _propertyKey, name, key, }) {
        if (!target.constructor.importStructureServiceEndpoints) {
            target.constructor.importStructureServiceEndpoints = {};
        }
        target.constructor.importStructureServiceEndpoints[_propertyKey] = {
            name,
            key,
        };
    }
    static setHeaderToMethod({ target, _propertyKey, key, value, }) {
        if (!target.constructor.headers) {
            target.constructor.headers = {};
        }
        const headersInfo = target.constructor.headers;
        if (!headersInfo[_propertyKey]) {
            headersInfo[_propertyKey] = {};
        }
        headersInfo[_propertyKey][key] = value;
    }
    static addSwaggerInfoToMethod({ target, _propertyKey, baseInfo, }) {
        if (!target.constructor.swaggerInfo) {
            target.constructor.swaggerInfo = {};
        }
        const swaggerInfo = target.constructor.swaggerInfo;
        swaggerInfo[_propertyKey] = baseInfo;
    }
}
exports.ControllerDecoratorsBuilder = ControllerDecoratorsBuilder;
//# sourceMappingURL=ControllerDecoratorsBuilder.js.map