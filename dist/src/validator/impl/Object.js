"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ObjectValidatorImpl = void 0;
const core_1 = require("../core");
const zod_1 = require("zod");
class ObjectValidatorImpl extends core_1.ZodValidatorImp {
    constructor(initialShape = {}) {
        super(zod_1.z.object(initialShape));
        this.hasParseJsonIfString = false;
    }
    partial() {
        const newValidator = new ObjectValidatorImpl();
        newValidator._schema = this._schema.partial();
        return newValidator;
    }
    merge(newSchema) {
        const newValidator = new ObjectValidatorImpl();
        //@ts-ignore
        newValidator._schema = this._schema.merge(newSchema._schema);
        return newValidator;
    }
    parseJsonIfString() {
        this.hasParseJsonIfString = true;
        return this;
    }
    getShape() {
        return this._schema._getCached().shape;
    }
    getType() {
        return 'object';
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
exports.ObjectValidatorImpl = ObjectValidatorImpl;
//# sourceMappingURL=Object.js.map