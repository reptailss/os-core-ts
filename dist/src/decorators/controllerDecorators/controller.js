"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Controller = void 0;
require("reflect-metadata");
const _di_1 = require("../../di");
function Controller() {
    return function (constructor) {
        constructor.prototype.endpoints = [...(constructor.endpoints || [])];
        constructor.prototype.args = Object.assign({}, (constructor.args || {}));
        constructor.prototype.swaggerInfo = Object.assign({}, (constructor.swaggerInfo || {}));
        constructor.prototype.headers = Object.assign({}, (constructor.headers || {}));
        constructor.prototype.importStructureServiceEndpoints = Object.assign({}, (constructor.importStructureServiceEndpoints || {}));
        constructor.prototype.type = 'default';
        _di_1.DiContainer.register(constructor, { lifetime: 'singleton' });
    };
}
exports.Controller = Controller;
//# sourceMappingURL=controller.js.map