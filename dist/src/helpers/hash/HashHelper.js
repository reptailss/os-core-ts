"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.HashHelper = void 0;
const md5_1 = __importDefault(require("md5"));
class HashHelper {
    static generateHash(value) {
        return (0, md5_1.default)(value);
    }
}
exports.HashHelper = HashHelper;
//# sourceMappingURL=HashHelper.js.map