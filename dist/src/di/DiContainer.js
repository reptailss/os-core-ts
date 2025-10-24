"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DiContainer = void 0;
const _di_1 = require("./");
require("reflect-metadata");
const _logger_1 = require("../logger");
class DiContainer {
    static resolve(token, providers, parentName) {
        if (providers) {
            const recordByProvider = providers.get(token);
            if (recordByProvider) {
                if (recordByProvider.useValue !== undefined) {
                    return recordByProvider.useValue;
                }
                if (recordByProvider.useFactory) {
                    if (recordByProvider.lifetime === 'singleton') {
                        if (!recordByProvider.instance) {
                            recordByProvider.instance = recordByProvider.useFactory();
                        }
                        return recordByProvider.instance;
                    }
                    else {
                        return recordByProvider.useFactory();
                    }
                }
                const TargetClass = recordByProvider.useClass || recordByProvider.target;
                if (recordByProvider.lifetime === 'singleton' && recordByProvider.instance) {
                    return recordByProvider.instance;
                }
                const paramTypes = Reflect.getMetadata('design:paramtypes', TargetClass) || [];
                const injectTokens = Reflect.getMetadata(_di_1.DI_INJECT_KEY, TargetClass) || [];
                const dependencies = paramTypes.map((paramType, index) => {
                    var _a;
                    const depToken = (_a = injectTokens[index]) !== null && _a !== void 0 ? _a : paramType;
                    return DiContainer.resolve(depToken, providers, TargetClass.name);
                });
                const instance = new TargetClass(...dependencies);
                if (recordByProvider.lifetime === 'singleton') {
                    recordByProvider.instance = instance;
                }
                return instance;
            }
        }
        const record = this.providers.get(token);
        if (!record) {
            if (parentName) {
                _logger_1.appLogger.error(`${parentName}: Token is not registered`);
            }
            throw new Error(`${parentName || ''} Token "${token.toString()}" is not registered.`);
        }
        if (record.useValue !== undefined) {
            return record.useValue;
        }
        if (record.useFactory) {
            if (record.lifetime === 'singleton') {
                if (!record.instance) {
                    record.instance = record.useFactory();
                }
                return record.instance;
            }
            else {
                return record.useFactory();
            }
        }
        const TargetClass = record.useClass || record.target;
        if (record.lifetime === 'singleton' && record.instance) {
            return record.instance;
        }
        const paramTypes = Reflect.getMetadata('design:paramtypes', TargetClass) || [];
        const injectTokens = Reflect.getMetadata(_di_1.DI_INJECT_KEY, TargetClass) || [];
        const dependencies = paramTypes.map((paramType, index) => {
            var _a;
            const depToken = (_a = injectTokens[index]) !== null && _a !== void 0 ? _a : paramType;
            return DiContainer.resolve(depToken, providers, TargetClass.name);
        });
        const instance = new TargetClass(...dependencies);
        if (record.lifetime === 'singleton') {
            record.instance = instance;
        }
        return instance;
    }
    static register(target, options = {}) {
        var _a;
        this.providers.set(target, {
            target,
            lifetime: (_a = options.lifetime) !== null && _a !== void 0 ? _a : 'singleton',
            useClass: options.useClass,
            useValue: options.useValue,
            useFactory: options.useFactory,
        });
    }
}
exports.DiContainer = DiContainer;
DiContainer.providers = new Map();
//# sourceMappingURL=DiContainer.js.map