"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ValidatorErrorValuesHelper = void 0;
class ValidatorErrorValuesHelper {
    static buildErrorValuesBySchema(errors) {
        var _a;
        if (!((_a = errors === null || errors === void 0 ? void 0 : errors.issues) === null || _a === void 0 ? void 0 : _a.length)) {
            return [];
        }
        const res = [];
        errors.issues.forEach((error) => {
            if (error.code === 'invalid_union') {
                const errorValues = this.buildErrorUnion(error);
                if (errorValues.length >= 1) {
                    res.push(...errorValues);
                }
                return;
            }
            const errorValue = this.buildErrorDefault(error);
            res.push(errorValue);
        });
        return res;
    }
    static buildErrorUnion(error) {
        var _a;
        if (!((_a = error === null || error === void 0 ? void 0 : error.unionErrors) === null || _a === void 0 ? void 0 : _a.length)) {
            return [];
        }
        const res = [];
        const hasUnionErrors = error.unionErrors.length > 1;
        if (hasUnionErrors) {
            res.push({
                key: error.path.join('.'),
                message: 'Should be one of the options:',
            });
        }
        error.unionErrors.forEach((error, index) => {
            const errorValues = this.buildErrorValuesBySchema(error);
            if (!(errorValues === null || errorValues === void 0 ? void 0 : errorValues.length)) {
                return;
            }
            if (hasUnionErrors && index > 0) {
                res.push('or');
            }
            res.push(...errorValues);
        });
        return res;
    }
    static buildErrorDefault(error) {
        const key = Array.isArray(error === null || error === void 0 ? void 0 : error.path) ? error.path.join('.') : error.path;
        const keyMessage = (key === null || key === void 0 ? void 0 : key.length) >= 1 ? `${key}` : '';
        if (!(keyMessage === null || keyMessage === void 0 ? void 0 : keyMessage.length)) {
            return error.message;
        }
        return { key: keyMessage, message: error.message };
    }
}
exports.ValidatorErrorValuesHelper = ValidatorErrorValuesHelper;
//# sourceMappingURL=ValidatorErrorValuesHelper.js.map