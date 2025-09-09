"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NumberValidatorIml = void 0;
const core_1 = require("../core");
const zod_1 = require("zod");
class NumberValidatorIml extends core_1.ZodValidatorImp {
    constructor(options) {
        if ((options === null || options === void 0 ? void 0 : options.coerce) !== false) {
            super(zod_1.z.coerce.number());
        }
        else {
            super(zod_1.z.number());
        }
    }
    min(minLength, message) {
        this._schema = this._schema.min(minLength, message);
        return this;
    }
    max(maxLength, message) {
        this._schema = this._schema.max(maxLength, message);
        return this;
    }
    int(message) {
        this._schema = this._schema.int(message);
        return this;
    }
    getType() {
        return 'number';
    }
}
exports.NumberValidatorIml = NumberValidatorIml;
//# sourceMappingURL=Number.js.map