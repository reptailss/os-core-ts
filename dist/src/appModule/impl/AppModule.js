"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
require("reflect-metadata");
const core_1 = require("../core");
const _appError_1 = require("../../appError");
function isProviderObject(value) {
    if (typeof value !== 'object' || value === null) {
        return false;
    }
    const provider = value.provider;
    if (provider === undefined ||
        (!['function', 'symbol', 'string'].includes(typeof provider))) {
        return false;
    }
    return !(!('useClass' in value) &&
        !('useValue' in value) &&
        !('useFactory' in value));
}
class AppModule {
    constructor(props) {
        var _a;
        this.controllers = [];
        this._diContainer = null;
        if (props.swaggerInfo) {
            this.swaggerInfo = props.swaggerInfo;
        }
        this.controllers = props.controllers;
        if ((_a = props.providers) === null || _a === void 0 ? void 0 : _a.length) {
            props.providers.forEach(item => {
                if (isProviderObject(item)) {
                    if (!('useClass' in item) && !('useValue' in item) && !('useFactory' in item)) {
                        throw new _appError_1.AppError(`Provider ${String(item.provider)} must define one of useClass/useValue/useFactory`);
                    }
                    this.overrideProvider(item.provider, {
                        lifetime: item.lifetime,
                        useClass: item.useClass,
                        useValue: item.useValue,
                        useFactory: item.useFactory,
                    });
                    return;
                }
                this.overrideProvider(item);
            });
        }
    }
    overrideProvider(target, options = {}) {
        if (!this._diContainer) {
            this._diContainer = new core_1.AppModuleDiContainer();
        }
        this._diContainer.register(target, options);
        return this;
    }
    getProviders() {
        if (!this._diContainer) {
            return null;
        }
        return this._diContainer.providers;
    }
}
exports.AppModule = AppModule;
//# sourceMappingURL=AppModule.js.map