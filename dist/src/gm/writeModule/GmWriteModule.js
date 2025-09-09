"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GmWriteModule = void 0;
const core_1 = require("../core");
class GmWriteModule {
    constructor(module) {
        module.init();
        this.gmCreateFile = new core_1.GmCreateFile(module);
    }
    run() {
        this.gmCreateFile.run();
    }
}
exports.GmWriteModule = GmWriteModule;
//# sourceMappingURL=GmWriteModule.js.map