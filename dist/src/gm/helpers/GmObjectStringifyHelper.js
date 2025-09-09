"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.GmObjectStringifyHelper = void 0;
const json5_1 = __importDefault(require("json5"));
class GmObjectStringifyHelper {
    static objectToString(obj) {
        let jsonString = json5_1.default.stringify(obj);
        jsonString = jsonString.replace(/"([^"]+)":/g, '$1:').replace(/"([^"]+)"/g, '$1');
        return jsonString;
    }
    static objectToStringWithoutValueQuotes(obj) {
        let jsonString = json5_1.default.stringify(obj);
        jsonString = jsonString.replace(/(["'])[^"']*\1/g, match => match.slice(1, -1));
        jsonString = jsonString.replace(/"([^"\"]+)":/g, '$1:');
        jsonString = jsonString.replace(/(\b\w+\b):\1/g, '$1');
        return jsonString;
    }
}
exports.GmObjectStringifyHelper = GmObjectStringifyHelper;
_a = GmObjectStringifyHelper;
GmObjectStringifyHelper.objectOptionsToString = (object, hasWrapper) => {
    var _b, _c, _d;
    const res = (_d = (_c = (_b = Object.entries(object)) === null || _b === void 0 ? void 0 : _b.map(([key, value]) => {
        if (typeof value === 'undefined') {
            return null;
        }
        if (Array.isArray(value)) {
            return `${key}:${JSON.stringify(value)}`;
        }
        return `${key}:${_a.objectToStringWithoutValueQuotes(object[key])}`;
    })) === null || _c === void 0 ? void 0 : _c.filter((val) => !!val)) === null || _d === void 0 ? void 0 : _d.join(',');
    if (!(res === null || res === void 0 ? void 0 : res.length)) {
        return '';
    }
    if (hasWrapper === false) {
        return res;
    }
    return `{${res}}`;
};
//# sourceMappingURL=GmObjectStringifyHelper.js.map