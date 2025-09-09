"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GmRenderImports = void 0;
const ALIAS = {
    'src/baseTypes/crud': '@baseTypes/crud',
};
class GmRenderImports {
    constructor(module) {
        this.module = module;
    }
    renderImports() {
        var _a;
        if (!((_a = this.module.getImports()) === null || _a === void 0 ? void 0 : _a.length)) {
            return '';
        }
        const groupImports = {};
        const groupRootImports = {};
        const groupLibImports = {};
        this.module.getImports().forEach((item) => {
            if (item.dirType === 'root') {
                const path = this.getNormalizeImportPath(item.path);
                if (!(path in groupRootImports)) {
                    groupRootImports[path] = [];
                }
                groupRootImports[path].push(Object.assign(Object.assign({}, item), { path }));
                return;
            }
            if (item.isLibImport) {
                const path = this.getNormalizeImportPath(item.path);
                if (!(path in groupLibImports)) {
                    groupLibImports[path] = [];
                }
                groupLibImports[path].push(Object.assign(Object.assign({}, item), { path }));
                return;
            }
            const path = this.getNormalizeImportPath(item.path);
            if (!(path in groupImports)) {
                groupImports[path] = [];
            }
            groupImports[path].push(Object.assign(Object.assign({}, item), { path }));
        });
        let res = '';
        for (const path in groupLibImports) {
            const properties = groupLibImports[path];
            const line = this.renderImportGroup({
                path,
                properties,
                rootDir: this.module.getRootModuleDirName(),
                isLibImport: true,
            });
            res += line;
        }
        for (const path in groupRootImports) {
            const properties = groupRootImports[path];
            const line = this.renderImportGroup({
                path,
                properties,
                rootDir: this.module.getRootModuleDirName(),
                isLibImport: false,
                dirType: 'root',
            });
            res += line;
        }
        for (const path in groupImports) {
            const properties = groupImports[path];
            const line = this.renderImportGroup({
                path,
                properties,
                rootDir: this.module.getRootModuleDirName(),
                isLibImport: false,
            });
            res += line;
        }
        return res;
    }
    renderImportGroup({ path, properties, isLibImport, rootDir, dirType, }) {
        const uniq = [...new Set(properties === null || properties === void 0 ? void 0 : properties.map((item) => item.propertyName))];
        if (isLibImport) {
            return `import { ${uniq.join(', ')} } from '${path}'\n`;
        }
        if (dirType === 'root') {
            if (path in ALIAS) {
                return `import { ${uniq.join(', ')} } from '${ALIAS[path]}'\n`;
            }
            return `import { ${uniq.join(', ')} } from '@${path}'\n`;
        }
        return `import { ${uniq.join(', ')} } from '@modules/${rootDir}/${path}'\n`;
    }
    getNormalizeImportPath(path) {
        const res = path.replace('.ts', '');
        if (res.endsWith('/index')) {
            return res.slice(0, -6);
        }
        if (res.endsWith('index')) {
            return res.slice(0, -5);
        }
        return res;
    }
}
exports.GmRenderImports = GmRenderImports;
//# sourceMappingURL=GmRenderImports.js.map