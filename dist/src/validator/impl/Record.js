"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RecordValidatorIml = void 0;
const zod_1 = require("zod");
const core_1 = require("../core");
class RecordValidatorIml extends core_1.ZodValidatorImp {
    constructor(value) {
        super(zod_1.z.record(value));
        this.hasParseJsonIfString = false;
    }
    getType() {
        return 'record';
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
exports.RecordValidatorIml = RecordValidatorIml;
//# sourceMappingURL=Record.js.map