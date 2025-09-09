"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ArrayValidatorIml = void 0;
const zod_1 = require("zod");
const core_1 = require("../core");
class ArrayValidatorIml extends core_1.ZodValidatorImp {
    constructor(schema) {
        super(zod_1.z.array(schema));
        this.hasParseJsonIfString = false;
    }
    min(minLength, message) {
        this._schema = this._schema.min(minLength, message);
        return this;
    }
    max(maxLength, message) {
        this._schema = this._schema.max(maxLength, message);
        return this;
    }
    getType() {
        return 'array';
    }
    parseJsonIfString() {
        this.hasParseJsonIfString = true;
        return this;
    }
    validate(data) {
        if (this.hasParseJsonIfString && typeof data === 'string') {
            try {
                return super.validate(JSON.parse(data));
            }
            catch (error) {
                return super.validate(data);
            }
        }
        return super.validate(data);
    }
    safeParse(input) {
        if (this.hasParseJsonIfString && typeof input.data === 'string') {
            try {
                input.data = JSON.parse(input.data);
            }
            catch (error) {
            }
        }
        return super.safeParse(input);
    }
    _parse(input) {
        if (this.hasParseJsonIfString && typeof input.data === 'string') {
            try {
                input.data = JSON.parse(input.data);
            }
            catch (error) {
            }
        }
        return super._parse(input);
    }
    _parseSync(input) {
        if (this.hasParseJsonIfString && typeof input.data === 'string') {
            try {
                input.data = JSON.parse(input.data);
            }
            catch (error) {
            }
        }
        return super._parseSync(input);
    }
}
exports.ArrayValidatorIml = ArrayValidatorIml;
//# sourceMappingURL=Array.js.map