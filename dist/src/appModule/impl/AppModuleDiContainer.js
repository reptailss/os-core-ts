"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModuleDiContainer = void 0;
require("reflect-metadata");
class AppModuleDiContainer {
    constructor() {
        this.providers = new Map();
    }
    register(target, options = {}) {
        var _a;
        this.providers.set(target, {
            target,
            lifetime: (_a = options.lifetime) !== null && _a !== void 0 ? _a : 'singleton',
            useClass: options.useClass,
            useValue: options.useValue,
            useFactory: options.useFactory,
        });
        return this;
    }
}
exports.AppModuleDiContainer = AppModuleDiContainer;
//# sourceMappingURL=AppModuleDiContainer.js.map