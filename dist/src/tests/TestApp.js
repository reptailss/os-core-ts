"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TestApp = void 0;
const _di_1 = require("../di");
class TestApp {
    constructor() {
        this.appModules = [];
        this.controllers = [];
    }
    useModule(appModule) {
        this.appModules.push(appModule);
        return this;
    }
    useModulesFromApp(app) {
        //@ts-ignore
        const modules = app.appModules;
        if (modules === null || modules === void 0 ? void 0 : modules.length) {
            modules.forEach((module) => {
                this.useModule(module);
            });
        }
        return this;
    }
    initModules() {
        for (const appModule of this.appModules) {
            this.initAppModule(appModule);
        }
        return this;
    }
    initAppModule(appModule) {
        if (appModule.controllers.length) {
            appModule.controllers.forEach((Controller) => {
                const controller = _di_1.DiContainer.resolve(Controller, appModule.getProviders());
                this.controllers.push(controller);
            });
        }
    }
}
exports.TestApp = TestApp;
//# sourceMappingURL=TestApp.js.map