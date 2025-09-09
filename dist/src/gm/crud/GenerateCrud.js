"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.GenerateCrud = void 0;
const _helpers_1 = require("../../helpers");
const core_1 = require("../core");
const path_1 = __importDefault(require("path"));
const fs_1 = __importDefault(require("fs"));
class GenerateCrud {
    async run() {
        const config = await core_1.GetGmConfig.getConfig();
        const dirName = _helpers_1.StringCaseHelper.toCamelCase(config.moduleName);
        const rootDir = config.rootDir || 'src';
        const rootDirArray = rootDir.split('/');
        const rootPath = path_1.default.resolve(process.cwd(), ...rootDirArray, 'modules', dirName);
        if (fs_1.default.existsSync(rootPath)) {
            throw new Error(`the folder ${dirName} already exists`);
        }
        switch (config.model.dbType) {
            case 'sql': {
                new core_1.GmGenerateCrudDecSql(config).run();
                break;
            }
            case 'noSql': {
                new core_1.GmGenerateCrudDecNoSql(config).run();
                break;
            }
        }
    }
}
exports.GenerateCrud = GenerateCrud;
//# sourceMappingURL=GenerateCrud.js.map