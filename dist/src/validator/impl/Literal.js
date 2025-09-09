"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LiteralValidatorIml = void 0;
const core_1 = require("../core");
const zod_1 = require("zod");
class LiteralValidatorIml extends core_1.ZodValidatorImp {
    constructor(value) {
        super(zod_1.z.literal(value));
    }
    getType() {
        return 'literal';
    }
}
exports.LiteralValidatorIml = LiteralValidatorIml;
//# sourceMappingURL=Literal.js.map