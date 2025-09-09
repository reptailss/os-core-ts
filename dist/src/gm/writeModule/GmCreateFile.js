"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.GmCreateFile = void 0;
const core_1 = require("../core");
const path_1 = __importDefault(require("path"));
const fs_1 = __importDefault(require("fs"));
let writtenModules = {};
class GmCreateFile {
    constructor(module) {
        this.gmCodeBuilder = new core_1.GmCodeBuilder();
        this.module = module;
    }
    run() {
        this.writeModule(this.module);
    }
    writeModule(module, parentDirName) {
        if (this.checkIsClassModule(module)) {
            if (module.getMethods().length) {
                module.getMethods().forEach(method => {
                    this.writeModule(method, parentDirName);
                });
            }
        }
        if (module.getModules().length) {
            this.createChildModules(module.getModules(), parentDirName);
        }
        if (module.getChildModules().length) {
            if (this.checkIsWriteModule(module)) {
                const dirName = module.getDirName();
                const dirNameWithParent = dirName ? `${parentDirName}/${dirName}` : parentDirName;
                const currentParentDirName = parentDirName ? dirNameWithParent : dirName;
                this.createChildModules(module.getChildModules(), currentParentDirName);
            }
            else {
                this.createChildModules(module.getChildModules(), parentDirName);
            }
        }
        if (!this.checkIsWriteModule(module) ||
            this.isModuleWritten(module.constructor.name)) {
            return;
        }
        this.markModuleAsWritten(module.constructor.name);
        this.checkAndCreateFolder(this.getOutputPath({
            modulePath: module.getDirName(),
            parentDirName,
            dirType: module.getDirType(),
        }));
        this.writeFileModule({
            templatePath: module.getTemplatePath(),
            outputPath: this.getOutputPath({
                modulePath: module.getFilePath(),
                parentDirName,
                dirType: module.getDirType(),
            }),
            data: this.getDataByModule(module),
            fileWriteModeGm: module.getFileWriteMode(),
            name: module.constructor.name,
        });
    }
    checkIsClassModule(module) {
        return module.moduleType === 'class';
    }
    checkIsWriteModule(module) {
        return module.moduleType === 'type' ||
            module.moduleType === 'constant' ||
            module.moduleType === 'class' ||
            module.moduleType === 'fn';
    }
    getDataByModule(module) {
        switch (module.moduleType) {
            case 'constant': {
                return {
                    gmRenderModuleConstant: new core_1.GmRenderModuleConstant(module),
                };
            }
            case 'fn': {
                return {
                    gmRenderModuleFn: new core_1.GmRenderModuleFn(module),
                };
            }
            case 'classMethod': {
                return {
                    gmRenderModuleClassMethod: new core_1.GmRenderModuleClassMethod(module),
                };
            }
            case 'class': {
                return {
                    gmRenderModuleClass: new core_1.GmRenderModuleClass(module),
                };
            }
            case 'type': {
                return {
                    gmRenderModuleType: new core_1.GmRenderModuleType(module),
                };
            }
        }
    }
    getBasePath(dirType) {
        const rootDir = this.module.getConfig().rootDir || 'src';
        const rootDirArray = rootDir.split('/');
        switch (dirType) {
            case 'modules':
                return path_1.default.resolve(process.cwd(), ...rootDirArray, 'modules', this.module.getRootModuleDirName());
            case 'root':
                return path_1.default.resolve(process.cwd(), ...rootDirArray);
            default:
                return '';
        }
    }
    getOutputPath({ modulePath, parentDirName, dirType, }) {
        const basePath = this.getBasePath(dirType);
        if (parentDirName) {
            if (modulePath) {
                return path_1.default.join(basePath, ...parentDirName.split('/'), path_1.default.join(...modulePath.split('/')));
            }
            return path_1.default.join(basePath, ...parentDirName.split('/'));
        }
        return modulePath ? path_1.default.join(basePath, ...modulePath.split('/')) : '';
    }
    markModuleAsWritten(moduleName) {
        writtenModules[moduleName] = true;
        return this;
    }
    isModuleWritten(moduleName) {
        return moduleName in writtenModules && writtenModules[moduleName];
    }
    createChildModules(childModules, parentDirName) {
        for (const module of childModules) {
            this.writeModule(module, parentDirName);
        }
    }
    checkAndCreateFolder(path) {
        if (!path || fs_1.default.existsSync(path)) {
            return;
        }
        fs_1.default.mkdirSync(path, { recursive: true });
    }
    writeFileModule({ outputPath, templatePath, data, fileWriteModeGm, name, }) {
        if (fs_1.default.existsSync(outputPath) && fileWriteModeGm === 'skipIfExists') {
            return;
        }
        const formattedCode = this.gmCodeBuilder.build({
            templatePath,
            data,
        });
        this.saveFile({
            outputPath,
            fileWriteModeGm,
            formattedCode,
            name,
        });
    }
    saveFile({ fileWriteModeGm, outputPath, formattedCode, name, }) {
        if (fs_1.default.existsSync(outputPath)) {
            switch (fileWriteModeGm) {
                case 'skipIfExists':
                    return;
                case 'overwrite':
                    fs_1.default.writeFileSync(outputPath, formattedCode, 'utf-8');
                    break;
                case 'appendBefore': {
                    this.appendFileModule({
                        outputPath,
                        code: formattedCode,
                        type: 'appendBefore',
                        name,
                    });
                    break;
                }
                case 'appendAfter': {
                    this.appendFileModule({
                        outputPath,
                        code: formattedCode,
                        type: 'appendAfter',
                        name,
                    });
                    break;
                }
            }
            return;
        }
        fs_1.default.writeFileSync(outputPath, formattedCode, 'utf-8');
    }
    appendFileModule({ outputPath, code, type, name, }) {
        const existingContent = fs_1.default.readFileSync(outputPath, 'utf-8');
        const newContent = type === 'appendBefore' ? this.combineAndOptimizeImports([code, existingContent]) : this.combineAndOptimizeImports([existingContent, code]);
        fs_1.default.writeFileSync(outputPath, newContent, 'utf-8');
    }
    combineAndOptimizeImports(codeBlocks) {
        const importMap = {};
        const fullCode = codeBlocks.join('\n');
        const importRegex = /import\s*\{[^}]*\}\s*from\s*['"][^'"]+['"];?/g;
        let match;
        while ((match = importRegex.exec(fullCode)) !== null) {
            const fullImport = match[0];
            const innerMatch = fullImport.match(/import\s*\{([^}]+)\}\s*from\s*['"]([^'"]+)['"]/);
            if (!innerMatch)
                continue;
            const [, importsBlock, source] = innerMatch;
            const imports = importsBlock
                .split(',')
                .map(name => name.trim())
                .filter(Boolean);
            if (!importMap[source]) {
                importMap[source] = new Set();
            }
            for (const imp of imports) {
                importMap[source].add(imp);
            }
        }
        let codeWithoutImports = fullCode.replace(importRegex, '');
        const originalLines = codeWithoutImports.split('\n');
        const hadLeadingEmpty = originalLines.length > 0 && originalLines[0].trim() === '';
        const hadTrailingEmpty = originalLines.length > 0 && originalLines[originalLines.length - 1].trim() === '';
        const trimmedLines = [...originalLines];
        while (trimmedLines.length > 0 && trimmedLines[0].trim() === '')
            trimmedLines.shift();
        while (trimmedLines.length > 0 && trimmedLines[trimmedLines.length - 1].trim() === '')
            trimmedLines.pop();
        const compactedLines = [];
        let emptyCount = 0;
        for (const line of trimmedLines) {
            if (line.trim() === '') {
                emptyCount++;
                if (emptyCount <= 2) {
                    compactedLines.push('');
                }
            }
            else {
                emptyCount = 0;
                compactedLines.push(line);
            }
        }
        if (hadLeadingEmpty)
            compactedLines.unshift('');
        if (hadTrailingEmpty)
            compactedLines.push('');
        const cleanedCode = compactedLines.join('\n');
        const combinedImports = Object.entries(importMap)
            .map(([source, imports]) => `import { ${Array.from(imports).join(', ')} } from '${source}';`)
            .join('\n');
        return `${combinedImports}\n\n${cleanedCode}`;
    }
}
exports.GmCreateFile = GmCreateFile;
//# sourceMappingURL=GmCreateFile.js.map