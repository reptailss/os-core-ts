"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GmServiceValidator = void 0;
const core_1 = require("../../core");
class GmServiceValidator {
    constructor() {
        this.serviceType = 'fn';
    }
    getExport() {
        return {
            path: 'os-core-ts',
            propertyName: 'Validator',
            isLibImport: true,
        };
    }
    getServiceName() {
        return 'Validator';
    }
    object(fields) {
        return `Validator.object(${core_1.GmObjectStringifyHelper.objectToStringWithoutValueQuotes(fields)})`;
    }
    string(min, max) {
        let base = 'Validator.string()';
        if (min) {
            base += `.min(${min})`;
        }
        if (max) {
            base += `.max(${max})`;
        }
        return base;
    }
    number(min, max) {
        let base = 'Validator.number()';
        if (min) {
            base += `.min(${min})`;
        }
        if (max) {
            base += `.max(${max})`;
        }
        return base;
    }
    date() {
        return 'Validator.date()';
    }
    boolean() {
        return 'Validator.boolean()';
    }
}
exports.GmServiceValidator = GmServiceValidator;
//# sourceMappingURL=GmServiceValidator.js.map