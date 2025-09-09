"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UnknownValidatorIml = void 0;
const core_1 = require("../core");
const zod_1 = require("zod");
class UnknownValidatorIml extends core_1.ZodValidatorImp {
    constructor() {
        super(zod_1.z.unknown());
    }
    getType() {
        return 'unknown';
    }
}
exports.UnknownValidatorIml = UnknownValidatorIml;
//# sourceMappingURL=Unknown.js.map