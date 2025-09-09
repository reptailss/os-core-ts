"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StringValidatorIml = void 0;
const core_1 = require("../core");
const zod_1 = require("zod");
class StringValidatorIml extends core_1.ZodValidatorImp {
    constructor() {
        super(zod_1.z.string());
    }
    min(minLength, message) {
        this._schema = this._schema.min(minLength, message);
        return this;
    }
    max(maxLength, message) {
        this._schema = this._schema.max(maxLength, message);
        return this;
    }
    email(message) {
        this._schema = this._schema.email(message);
        return this;
    }
    getType() {
        return 'string';
    }
}
exports.StringValidatorIml = StringValidatorIml;
//# sourceMappingURL=String.js.map