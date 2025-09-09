"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BooleanValidatorImpl = void 0;
const core_1 = require("../core");
const zod_1 = require("zod");
class BooleanValidatorImpl extends core_1.ZodValidatorImp {
    constructor(options) {
        if ((options === null || options === void 0 ? void 0 : options.coerce) !== false) {
            super(zod_1.z.coerce.boolean());
        }
        else {
            super(zod_1.z.boolean());
        }
    }
    getType() {
        return 'boolean';
    }
}
exports.BooleanValidatorImpl = BooleanValidatorImpl;
//# sourceMappingURL=Boolean.js.map