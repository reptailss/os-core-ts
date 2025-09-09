"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetSwaggerTSService = void 0;
const fs_1 = __importDefault(require("fs"));
const core_1 = require("../core");
class GetSwaggerTSService {
    getFromFile() {
        const { filePath } = core_1.SwaggerHelper.getTSSchemaPaths();
        try {
            const file = fs_1.default.readFileSync(filePath, 'utf-8');
            if (!file) {
                return {};
            }
            return JSON.parse(file);
        }
        catch (error) {
            return {};
        }
    }
}
exports.GetSwaggerTSService = GetSwaggerTSService;
//# sourceMappingURL=GetSwaggerTSService.js.map