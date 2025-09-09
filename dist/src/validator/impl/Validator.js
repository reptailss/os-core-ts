"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Validator = void 0;
const core_1 = require("../core");
class Validator {
    static string() {
        return new core_1.StringValidatorIml();
    }
    static number() {
        return new core_1.NumberValidatorIml();
    }
    static date() {
        return new core_1.DateValidatorImpl();
    }
    static boolean() {
        return new core_1.BooleanValidatorImpl();
    }
    static booleanNum() {
        return new core_1.BooleanNumValidatorImpl();
    }
    static enum(value) {
        return new core_1.EnumValidatorImpl(value);
    }
    static array(value) {
        return new core_1.ArrayValidatorIml(value);
    }
    static union(value) {
        return new core_1.UnionValidatorIml(value);
    }
    static record(value) {
        return new core_1.RecordValidatorIml(value);
    }
    static unknown() {
        return new core_1.UnknownValidatorIml();
    }
    static object(value) {
        return new core_1.ObjectValidatorImpl(value);
    }
    static literal(value) {
        return new core_1.LiteralValidatorIml(value);
    }
}
exports.Validator = Validator;
//# sourceMappingURL=Validator.js.map