"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EntityDb = void 0;
function EntityDb() {
    return function (constructor) {
        const originalConstructor = constructor;
        const newConstructor = function (...args) {
            const instance = new originalConstructor(...args);
            instance._columns = originalConstructor._columns || {};
            instance._primaryKey = originalConstructor._primaryKey || null;
            instance._dateAdd = originalConstructor._dateAdd || null;
            instance._dateUpdate = originalConstructor._dateUpdate || null;
            return instance;
        };
        newConstructor.prototype = originalConstructor.prototype;
        return newConstructor;
    };
}
exports.EntityDb = EntityDb;
//# sourceMappingURL=entityDec.js.map