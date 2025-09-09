"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DateValidatorImpl = void 0;
const zod_1 = require("zod");
const core_1 = require("../core");
class DateValidatorImpl extends core_1.ZodValidatorImp {
    constructor(options) {
        if ((options === null || options === void 0 ? void 0 : options.coerce) !== false) {
            super(zod_1.z.coerce.date());
        }
        else {
            super(zod_1.z.date());
        }
    }
    min(minDate, message) {
        this._schema = this._schema.min(minDate, message);
        return this;
    }
    max(maxDate, message) {
        this._schema = this._schema.max(maxDate, message);
        return this;
    }
    getType() {
        return 'boolean';
    }
}
exports.DateValidatorImpl = DateValidatorImpl;
//# sourceMappingURL=Date.js.map