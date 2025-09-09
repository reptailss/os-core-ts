"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BooleanNumValidatorImpl = void 0;
const core_1 = require("../core");
const zod_1 = require("zod");
class BooleanNumValidatorImpl extends core_1.ZodValidatorImp {
    constructor() {
        super(zod_1.z
            .custom()
            .refine((value) => {
            return value === '0' || value === '1' || value === 0 || value === 1;
        }, 'Must by 0 or 1').transform((value) => {
            if (typeof value === 'string') {
                return Number(value);
            }
            return value;
        }));
    }
    getType() {
        return 'booleanNum';
    }
}
exports.BooleanNumValidatorImpl = BooleanNumValidatorImpl;
//# sourceMappingURL=BooleanNum.js.map