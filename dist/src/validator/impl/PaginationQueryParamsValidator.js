"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PaginationQueryParamsValidator = void 0;
const _params_1 = require("../../params");
const _validator_1 = require("..");
class PaginationQueryParamsValidator {
    static getSchema(rowSchema, options = {}) {
        return _validator_1.Validator.object({
            where: this.getWhereSchemaByKeys(rowSchema, options.onlyWhereKeys),
            order: this.getOrderSchemaByKeys(rowSchema, options.onlyOrderKeys),
            page: _validator_1.Validator.number().optional(),
            per_page: _validator_1.Validator.number().optional(),
        });
    }
    static getWhereSchemaByKeys(rowSchema, onlyWhereKeys) {
        const newShape = {};
        //@ts-ignore
        const shapes = rowSchema.getShape();
        for (const key in shapes) {
            if (onlyWhereKeys &&
                onlyWhereKeys.length >= 1 &&
                !onlyWhereKeys.includes(key)) {
                continue;
            }
            const schema = shapes[key];
            const type = schema.getType();
            if (!this.checkIsPrimitiveType(type)) {
                continue;
            }
            newShape[key] = schema;
            if (this.checkIsStringType(type)) {
                _params_1.BASE_WHERE_STRING_OPERATORS.forEach((operator) => {
                    const keyWithOperator = `${key} ${operator}`;
                    if (operator === 'IN' ||
                        operator === 'NOT IN') {
                        newShape[keyWithOperator] = _validator_1.Validator.array(schema);
                        return;
                    }
                    newShape[keyWithOperator] = schema;
                });
            }
            if (this.checkIsNumberType(type)) {
                _params_1.BASE_WHERE_NUMBER_OPERATORS.forEach((operator) => {
                    const keyWithOperator = `${key} ${operator}`;
                    if (operator === 'IN' ||
                        operator === 'NOT IN') {
                        newShape[keyWithOperator] = _validator_1.Validator.array(schema);
                        return;
                    }
                    newShape[keyWithOperator] = schema;
                });
            }
            if (this.checkIsDateType(type)) {
                _params_1.BASE_WHERE_DATE_OPERATORS.forEach((operator) => {
                    const keyWithOperator = `${key} ${operator}`;
                    newShape[keyWithOperator] = schema;
                });
            }
        }
        return _validator_1.Validator.object(newShape).partial().optional();
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
    static checkIsStringType(type) {
        return type === 'string' ||
            type === 'literal' ||
            type === 'enum';
    }
    static checkIsNumberType(type) {
        return type === 'number' ||
            type === 'booleanNum';
    }
    static checkIsDateType(type) {
        return type === 'date';
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