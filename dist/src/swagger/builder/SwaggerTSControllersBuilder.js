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
exports.SwaggerTSControllersBuilder = void 0;
const glob_1 = __importDefault(require("glob"));
const path_1 = __importDefault(require("path"));
const core_1 = require("../core");
const fs_1 = __importDefault(require("fs"));
const ts = __importStar(require("typescript"));
const DECORATOR_METHODS_NAMES = [
    'PostDec',
    'GetDec',
    'DeleteDec',
    'PutDec',
    'SystemPostDec',
    'SystemGetDec',
    'SystemDeleteDec',
    'SystemPutDec',
];
class SwaggerTSControllersBuilder {
    buildAndSaveToFile(appDirPath) {
        this.saveResponseAndParamsToFile(this.getResponseAndParams(appDirPath), appDirPath);
    }
    deleteFromFile(appDirPath) {
        const { dirPath } = core_1.SwaggerHelper.getTSResultAndParamsPaths(appDirPath);
        try {
            fs_1.default.rmSync(dirPath, { recursive: true, force: true });
        }
        catch (error) {
            console.log(error);
        }
    }
    getResponseAndParams(appDirPath) {
        const rootDir = appDirPath || 'src';
        return this.generateFileByMethods(this.extractControllersBuildTsSchema(this.getFilePaths(appDirPath), path_1.default.join(process.cwd(), ...rootDir.split('/'), 'modules')));
    }
    getFilePaths(appDirPath) {
        const controllersFilesPattern = appDirPath ? [`${appDirPath}/modules/**/controllers/**/*.ts`] : ['src/modules/**/controllers/**/*.ts'];
        return [].concat(...controllersFilesPattern.map((f) => glob_1.default.sync(f))).map((value) => {
            while (value.substr(0, 2) === './') {
                value = value.substr(2);
            }
            return value;
        });
    }
    extractControllersBuildTsSchema(filePaths, rootPath) {
        const result = [];
        filePaths.forEach((filePath) => {
            const sourceFile = ts.createSourceFile(filePath, ts.sys.readFile(filePath) || '', ts.ScriptTarget.ESNext, true);
            ts.forEachChild(sourceFile, (node) => {
                if (ts.isClassDeclaration(node) && node.name) {
                    const className = node.name.text;
                    const classDecorators = ts.getDecorators(node) || [];
                    const hasControllerDec = classDecorators.some((decorator) => {
                        return this.isDecoratorNamed(decorator, 'ControllerDec') ||
                            this.isDecoratorNamed(decorator, 'SystemControllerDec');
                    });
                    if (hasControllerDec) {
                        const methods = [];
                        node.members.forEach((member) => {
                            var _a, _b;
                            if (ts.isMethodDeclaration(member) &&
                                member.name &&
                                ts.isIdentifier(member.name)) {
                                const methodDecorators = ts.getDecorators(member) || [];
                                const hasHttpDecorator = methodDecorators.some((decorator) => DECORATOR_METHODS_NAMES.some((name) => this.isDecoratorNamed(decorator, name)));
                                if (!hasHttpDecorator) {
                                    return;
                                }
                                const returnType = member.type;
                                const isVoidMethod = !returnType || (returnType.kind === ts.SyntaxKind.VoidKeyword ||
                                    (ts.isTypeReferenceNode(returnType) &&
                                        (returnType.typeName.getText() === 'void' ||
                                            returnType.typeName.getText() === 'Promise' &&
                                                ((_b = (_a = returnType.typeArguments) === null || _a === void 0 ? void 0 : _a[0]) === null || _b === void 0 ? void 0 : _b.getText()) === 'void')));
                                methods.push({
                                    name: member.name.text,
                                    hasReturnType: !isVoidMethod,
                                });
                            }
                        });
                        if (methods.length > 0) {
                            const relativeFilePath = path_1.default.relative(rootPath, filePath);
                            result.push({
                                className,
                                methods,
                                filePath: relativeFilePath,
                            });
                        }
                    }
                }
            });
        });
        return result;
    }
    isDecoratorNamed(decorator, name) {
        if (ts.isCallExpression(decorator.expression)) {
            const { expression } = decorator.expression;
            return ts.isIdentifier(expression) && expression.text === name;
        }
        return false;
    }
    generateFileByMethods(data) {
        var _a, _b;
        if (!(data === null || data === void 0 ? void 0 : data.length)) {
            return '';
        }
        const importsValues = (_a = data.map((controller) => {
            const normalPath = controller.filePath.replace(/\\/g, '/').replace('.ts', '');
            return `import{ ${controller.className} } from '@modules/${normalPath}'`;
        })) === null || _a === void 0 ? void 0 : _a.join('\n');
        const types = (_b = data.map((controller) => {
            var _a, _b;
            return (_b = (_a = controller.methods) === null || _a === void 0 ? void 0 : _a.map((method) => {
                const paramTypeName = core_1.SwaggerTSHelper.getParamsKeyBuildTsSchema({
                    method: method.name,
                    className: controller.className,
                });
                if (!method.hasReturnType) {
                    return `type ${paramTypeName} = Parameters<${controller.className}['${method.name}']>`;
                }
                const responseTypeName = core_1.SwaggerTSHelper.getResponseKeyBuildTsSchema({
                    method: method.name,
                    className: controller.className,
                });
                return `type ${paramTypeName} = Parameters<${controller.className}['${method.name}']>\ntype ${responseTypeName} = Awaited<ReturnType<${controller.className}['${method.name}']>>`;
            })) === null || _b === void 0 ? void 0 : _b.join('\n');
        })) === null || _b === void 0 ? void 0 : _b.join('\n');
        return `${importsValues}\n${types}`;
    }
    saveResponseAndParamsToFile(types, appDirPath) {
        const { filePath, dirPath } = core_1.SwaggerHelper.getTSResultAndParamsPaths(appDirPath);
        if (!fs_1.default.existsSync(dirPath)) {
            fs_1.default.mkdirSync(dirPath, { recursive: true });
        }
        fs_1.default.writeFile(filePath, types, 'utf8', (error) => {
            if (error) {
                console.error(error);
            }
        });
    }
}
exports.SwaggerTSControllersBuilder = SwaggerTSControllersBuilder;
//# sourceMappingURL=SwaggerTSControllersBuilder.js.map