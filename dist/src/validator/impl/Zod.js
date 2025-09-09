"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ZodValidatorImp = void 0;
const core_1 = require("../core");
class ZodValidatorImp {
    constructor(schema) {
        this._schema = schema;
    }
    validate(value) {
        const { data, error, } = this._schema.safeParse(value);
        if (error) {
            const errors = core_1.ValidatorErrorValuesHelper.buildErrorValuesBySchema(error);
            return {
                error: true,
                errors,
                data: null,
                success: false,
            };
        }
        return {
            error: false,
            errors: [],
            data: data,
            success: true,
        };
    }
    optional() {
        this._schema = this._schema.optional();
        return this;
    }
    nullable() {
        this._schema = this._schema.nullable();
        return this;
    }
    refine(checkCb, message) {
        this._schema = this._schema.refine(checkCb, message);
        return this;
    }
    transform(cb) {
        this._schema = this._schema.transform(cb);
        return this;
    }
    //needed for zod
    safeParse(value) {
        return this._schema.safeParse(value);
    }
    //needed for zod
    _parse(input) {
        return this._schema._parse(input);
    }
    //needed for zod
    _parseSync(input) {
        return this._schema._parse(input);
    }
}
exports.ZodValidatorImp = ZodValidatorImp;
//# sourceMappingURL=Zod.js.map