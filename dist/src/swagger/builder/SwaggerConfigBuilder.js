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
exports.SwaggerConfigBuilder = void 0;
const path_1 = __importDefault(require("path"));
const fs_1 = __importDefault(require("fs"));
const core_1 = require("../core");
class SwaggerConfigBuilder {
    constructor() {
        this.getOrCreateSwaggerConfig = async () => {
            const config = await this.getConfig();
            if (!config) {
                return this.writeDefaultConfig();
            }
            return config;
        };
        this.getConfig = async () => {
            try {
                const configPath = path_1.default.resolve(process.cwd(), 'swaggerConfig.ts');
                const configFile = await Promise.resolve(`${configPath}`).then(s => __importStar(require(s)));
                if ((configFile === null || configFile === void 0 ? void 0 : configFile.default) && typeof configFile.default === 'function') {
                    return configFile.default();
                }
                return null;
            }
            catch (error) {
                return null;
            }
        };
        this.writeDefaultConfig = () => {
            const configPath = path_1.default.resolve(__dirname, '../', '../', '../', 'templates', 'swagger', 'defaultSwaggerConfig.ejs');
            const configFile = fs_1.default.readFileSync(configPath, 'utf-8');
            const outputPath = path_1.default.resolve(process.cwd(), 'swaggerConfig.ts');
            fs_1.default.writeFileSync(outputPath, configFile, 'utf-8');
            return {
                title: 'Swagger title',
                description: 'Swagger description',
                hasAuth: true,
            };
        };
    }
    getFromBuildFile() {
        const { filePath } = core_1.SwaggerHelper.getSwaggerConfigBuildPaths();
        try {
            const file = fs_1.default.readFileSync(filePath, 'utf-8');
            if (!file) {
                return {
                    title: 'Swagger title',
                    description: 'Swagger description',
                    hasAuth: true,
                };
            }
            return JSON.parse(file);
        }
        catch (error) {
            return {
                title: 'Swagger title',
                description: 'Swagger description',
                hasAuth: true,
            };
        }
    }
    saveToBuildFile(config) {
        const { filePath, dirPath } = core_1.SwaggerHelper.getSwaggerConfigBuildPaths();
        if (!fs_1.default.existsSync(dirPath)) {
            fs_1.default.mkdirSync(dirPath, { recursive: true });
        }
        fs_1.default.writeFile(filePath, JSON.stringify(config), 'utf8', (error) => {
            if (error) {
                console.error(error);
            }
        });
    }
}
exports.SwaggerConfigBuilder = SwaggerConfigBuilder;
//# sourceMappingURL=SwaggerConfigBuilder.js.map