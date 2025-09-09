"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetGmConfig = void 0;
const path_1 = __importDefault(require("path"));
const GmWriteDefaultConfig_1 = require("./GmWriteDefaultConfig");
const gmDefaultConfig_1 = require("./gmDefaultConfig");
class GetGmConfig {
    static async getConfig() {
        try {
            const configPath = path_1.default.resolve(process.cwd(), 'gCrudConfig.ts');
            const configFile = await Promise.resolve(`${configPath}`).then(s => __importStar(require(s)));
            if ((configFile === null || configFile === void 0 ? void 0 : configFile.default) && typeof configFile.default === 'function') {
                return configFile.default();
            }
            return gmDefaultConfig_1.gmDefaultConfig.default;
        }
        catch (error) {
            GmWriteDefaultConfig_1.GmWriteDefaultConfig.write();
            return gmDefaultConfig_1.gmDefaultConfig.default;
        }
    }
}
exports.GetGmConfig = GetGmConfig;
//# sourceMappingURL=GetGmConfig.js.map