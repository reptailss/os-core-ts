import { Controller } from '@controllers';
import {DecoratorClass} from '@decorators/core'


export function ControllerDec(): DecoratorClass {
    return function(constructor) {
        const originalConstructor = constructor;
        const newConstructor: any = function(...args: any[]) {
            const instance: Controller = new originalConstructor(...args);
            instance.endpoints = [...(originalConstructor.endpoints || [])];
            instance.args = { ...(originalConstructor.args || {}) };
            instance.swaggerInfo = { ...(originalConstructor.swaggerInfo || {}) };
            instance.headers = { ...(originalConstructor.headers || {}) };
            instance.importStructureServiceEndpoints = { ...(originalConstructor.importStructureServiceEndpoints || {}) };
            instance.name = originalConstructor.name;
            instance.type = 'default';
            return instance;
        };
        newConstructor.prototype = originalConstructor.prototype;
        return newConstructor;
    };
}


