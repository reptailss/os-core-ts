"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
class AppModule {
    constructor(props) {
        var _a;
        this.appModules = [];
        if ('appModules' in props && props.appModules) {
            this.appModules = props.appModules;
        }
        if ('swaggerInfo' in props && props.swaggerInfo) {
            this.swaggerInfo = props.swaggerInfo;
        }
        const res = [];
        if ('controllers' in props && ((_a = props.controllers) === null || _a === void 0 ? void 0 : _a.length) >= 1) {
            props.controllers.forEach((Controller) => {
                const instance = new Controller();
                res.push(instance);
            });
        }
        this.controllers = res;
    }
}
exports.AppModule = AppModule;
//# sourceMappingURL=AppModule.js.map