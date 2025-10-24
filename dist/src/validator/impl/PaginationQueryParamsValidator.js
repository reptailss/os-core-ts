"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PaginationQueryParamsValidator = void 0;
const _validator_1 = require("..");
const WhereValidator_1 = require("./WhereValidator");
class PaginationQueryParamsValidator {
    static getSchema(rowSchema, options = {}) {
        return _validator_1.Validator.object({
            where: WhereValidator_1.WhereValidator.getSchema(rowSchema, options.onlyWhereKeys),
            order: this.getOrderSchemaByKeys(rowSchema, options.onlyOrderKeys),
            page: _validator_1.Validator.number().optional(),
            per_page: _validator_1.Validator.number().optional(),
        });
    }
    static getOrderSchemaByKeys(rowSchema, onlyOrderKeys) {
        const newShape = {};
        //@ts-ignore
        const shapes = rowSchema.getShape();
        for (const key in shapes) {
            if (onlyOrderKeys &&
                onlyOrderKeys.length >= 1 &&
                !onlyOrderKeys.includes(key)) {
                continue;
            }
            const schema = shapes[key];
            const type = schema.getType();
            if (!this.checkIsPrimitiveType(type)) {
                continue;
            }
            newShape[key] = _validator_1.Validator.enum(['asc', 'desc', 'ASC', 'DESC']);
        }
        return _validator_1.Validator.object(newShape).partial().optional();
    }
    static checkIsPrimitiveType(type) {
        return type === 'boolean' ||
            type === 'booleanNum' ||
            type === 'date' ||
            type === 'literal' ||
            type === 'number' ||
            type === 'enum' ||
            type === 'string';
    }
}
exports.PaginationQueryParamsValidator = PaginationQueryParamsValidator;
//# sourceMappingURL=PaginationQueryParamsValidator.js.map