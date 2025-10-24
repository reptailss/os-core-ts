"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SwaggerTSBuilder = void 0;
const glob_1 = __importDefault(require("glob"));
const fs_1 = __importDefault(require("fs"));
const typescript_json_schema_1 = require("typescript-json-schema");
const core_1 = require("../core");
const DEFAULT_ARGS_BUILD_SWAGGER = {
    ref: true,
    aliasRef: false,
    topRef: false,
    titles: false,
    required: true,
    defaultProps: true,
    noExtraProps: false,
    propOrder: false,
    typeOfKeyword: false,
    strictNullChecks: false,
    esModuleInterop: false,
    skipLibCheck: false,
    experimentalDecorators: true,
    ignoreErrors: false,
    out: '',
    validationKeywords: [],
    include: [],
    excludePrivate: false,
    uniqueNames: false,
    rejectDateType: false,
    id: '',
    defaultNumberType: 'number',
    tsNodeRegister: false,
    constAsEnum: false,
};
class SwaggerTSBuilder {
    constructor() {
        this.swaggerConfigBuilder = new core_1.SwaggerConfigBuilder();
        this.swaggerTSControllersBuilder = new core_1.SwaggerTSControllersBuilder();
        this.saveToFile = (res) => {
            const { filePath, dirPath } = core_1.SwaggerHelper.getTSSchemaPaths();
            if (!fs_1.default.existsSync(dirPath)) {
                fs_1.default.mkdirSync(dirPath, { recursive: true });
            }
            fs_1.default.writeFile(filePath, JSON.stringify(res), 'utf8', (error) => {
                if (error) {
                    console.error(error);
                }
            });
        };
    }
    async buildFromControllers() {
        const swaggerConfig = await this.swaggerConfigBuilder.getOrCreateSwaggerConfig();
        this.swaggerConfig = swaggerConfig;
        this.swaggerConfigBuilder.saveToBuildFile(swaggerConfig);
        this.swaggerTSControllersBuilder.buildAndSaveToFile(swaggerConfig === null || swaggerConfig === void 0 ? void 0 : swaggerConfig.appDir, swaggerConfig === null || swaggerConfig === void 0 ? void 0 : swaggerConfig.modulesDir);
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                this.buildAndSaveSchema(swaggerConfig === null || swaggerConfig === void 0 ? void 0 : swaggerConfig.appDir);
                resolve(true);
            }, 500);
        });
    }
    buildAndSaveSchema(appDirPath) {
        const program = (0, typescript_json_schema_1.programFromConfig)('tsconfig.json', this.getFilePaths());
        const definition = (0, typescript_json_schema_1.generateSchema)(program, '*', DEFAULT_ARGS_BUILD_SWAGGER);
        this.saveToFile(this.normalizeSchema(definition));
        this.swaggerTSControllersBuilder.deleteFromFile(appDirPath);
    }
    getFilePaths() {
        var _a;
        const tsFilesPattern = ((_a = this.swaggerConfig) === null || _a === void 0 ? void 0 : _a.appDir) ? [`${this.swaggerConfig.appDir}/**/*.ts`] : ['src/**/*.ts'];
        return [].concat(...tsFilesPattern.map((f) => glob_1.default.sync(f))).map((value) => {
            while (value.substr(0, 2) === './') {
                value = value.substr(2);
            }
            return value;
        });
    }
    normalizeSchema(data) {
        if (!(data === null || data === void 0 ? void 0 : data.definitions)) {
            return {};
        }
        const newDefinition = {};
        for (const key in data.definitions) {
            const isParams = core_1.SwaggerTSHelper.checkIsParamKey(key);
            const value = data.definitions[key];
            if (typeof value === 'boolean') {
                continue;
            }
            if (!isParams) {
                newDefinition[key] = value;
                continue;
            }
            newDefinition[key] = this.normalizeParam(value);
        }
        return newDefinition;
    }
    normalizeParam(value) {
        var _a;
        if ((value === null || value === void 0 ? void 0 : value.type) !== 'array' ||
            !(value === null || value === void 0 ? void 0 : value.items) ||
            !Array.isArray(value.items)) {
            return [];
        }
        return (_a = value.items) === null || _a === void 0 ? void 0 : _a.map((item) => {
            if (!item || typeof item === 'boolean') {
                return {};
            }
            return item;
        });
    }
}
exports.SwaggerTSBuilder = SwaggerTSBuilder;
//# sourceMappingURL=SwaggerTSBuilder.js.map