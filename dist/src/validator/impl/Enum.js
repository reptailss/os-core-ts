"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EnumValidatorImpl = void 0;
const core_1 = require("../core");
const zod_1 = require("zod");
class EnumValidatorImpl extends core_1.ZodValidatorImp {
    constructor(value) {
        super(zod_1.z.enum(value));
    }
    getType() {
        return 'enum';
    }
}
exports.EnumValidatorImpl = EnumValidatorImpl;
//# sourceMappingURL=Enum.js.map