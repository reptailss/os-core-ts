"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GmGenerateAbstractCrudDec = void 0;
const core_1 = require("../core");
class GmGenerateAbstractCrudDec {
    constructor(config, controllers) {
        this.controllers = [];
        this.config = config;
        this.controllers = controllers;
    }
    run() {
        if (!this.controllers.length) {
            return;
        }
        this.controllers.forEach((controller) => {
            new core_1.GmWriteModule(controller).run();
        });
        new core_1.GmWriteModule(new core_1.GmModuleAppModule(this.config, this.controllers)).run();
    }
}
exports.GmGenerateAbstractCrudDec = GmGenerateAbstractCrudDec;
//# sourceMappingURL=GmGenerateAbstractCrudDec.js.map