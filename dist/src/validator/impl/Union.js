"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UnionValidatorIml = void 0;
const zod_1 = require("zod");
const core_1 = require("../core");
class UnionValidatorIml extends core_1.ZodValidatorImp {
    constructor(schema) {
        super(zod_1.z.union(schema));
    }
    getType() {
        return 'union';
    }
}
exports.UnionValidatorIml = UnionValidatorIml;
//# sourceMappingURL=Union.js.map