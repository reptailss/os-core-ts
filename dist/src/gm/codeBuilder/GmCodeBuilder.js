"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.GmCodeBuilder = void 0;
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const ejs_1 = __importDefault(require("ejs"));
const sync_1 = __importDefault(require("@prettier/sync"));
class GmCodeBuilder {
    build({ templatePath, data, }) {
        const currentTemplatePath = path_1.default.join(__dirname, '../', '../', '../', 'templates', 'gm', path_1.default.join(...templatePath.split('/')));
        const template = fs_1.default.readFileSync(currentTemplatePath, 'utf-8');
        const codes = ejs_1.default.render(template, data);
        return sync_1.default.format(codes, {
            parser: 'typescript',
            semi: false,
            singleQuote: true,
            bracketSpacing: false,
            arrowParens: 'avoid',
            trailingComma: 'all',
            tabWidth: 4,
            printWidth: 100,
            alignProps: true,
        });
    }
}
exports.GmCodeBuilder = GmCodeBuilder;
//# sourceMappingURL=GmCodeBuilder.js.map