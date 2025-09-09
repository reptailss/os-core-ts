"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ControllerDec = void 0;
function ControllerDec() {
    return function (constructor) {
        const originalConstructor = constructor;
        const newConstructor = function (...args) {
            const instance = new originalConstructor(...args);
            instance.endpoints = [...(originalConstructor.endpoints || [])];
            instance.args = Object.assign({}, (originalConstructor.args || {}));
            instance.swaggerInfo = Object.assign({}, (originalConstructor.swaggerInfo || {}));
            instance.headers = Object.assign({}, (originalConstructor.headers || {}));
            instance.importStructureServiceEndpoints = Object.assign({}, (originalConstructor.importStructureServiceEndpoints || {}));
            instance.name = originalConstructor.name;
            instance.type = 'default';
            return instance;
        };
        newConstructor.prototype = originalConstructor.prototype;
        return newConstructor;
    };
}
exports.ControllerDec = ControllerDec;
//# sourceMappingURL=controllerDec.js.map