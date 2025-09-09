import {GmImport, GmModuleDirType, IGmModule} from '@gm/core'

const ALIAS: Record<string, string> = {
    'src/baseTypes/crud': '@baseTypes/crud',
}

export class GmRenderImports {

    private readonly module: IGmModule

    constructor(module: IGmModule) {
        this.module = module
    }

    public renderImports(): string {

        if (!this.module.getImports()?.length) {
            return ''
        }
        const groupImports: Record<string, GmImport[]> = {}
        const groupRootImports: Record<string, GmImport[]> = {}
        const groupLibImports: Record<string, GmImport[]> = {}

        this.module.getImports().forEach((item) => {
            if (item.dirType === 'root') {
                const path = this.getNormalizeImportPath(item.path)
                if (!(path in groupRootImports)) {
                    groupRootImports[path] = []
                }
                groupRootImports[path].push({
                    ...item,
                    path,
                })
                return
            }
            if (item.isLibImport) {
                const path = this.getNormalizeImportPath(item.path)
                if (!(path in groupLibImports)) {
                    groupLibImports[path] = []
                }
                groupLibImports[path].push({
                    ...item,
                    path,
                })
                return
            }
            const path = this.getNormalizeImportPath(item.path)
            if (!(path in groupImports)) {
                groupImports[path] = []
            }
            groupImports[path].push({
                ...item,
                path,
            })
        })

        let res = ''

        for (const path in groupLibImports) {
            const properties = groupLibImports[path]
            const line = this.renderImportGroup({
                path,
                properties,
                rootDir: this.module.getRootModuleDirName(),
                isLibImport: true,
            })
            res += line
        }

        for (const path in groupRootImports) {
            const properties = groupRootImports[path]
            const line = this.renderImportGroup({
                path,
                properties,
                rootDir: this.module.getRootModuleDirName(),
                isLibImport: false,
                dirType: 'root',
            })
            res += line
        }

        for (const path in groupImports) {
            const properties = groupImports[path]
            const line = this.renderImportGroup({
                path,
                properties,
                rootDir: this.module.getRootModuleDirName(),
                isLibImport: false,
            })
            res += line
        }
        return res
    }

    private renderImportGroup({
                                  path,
                                  properties,
                                  isLibImport,
                                  rootDir,
                                  dirType,
                              }: {
        path: string
        properties: GmImport[],
        rootDir: string
        isLibImport: boolean
        dirType?: GmModuleDirType
    }) {
        const uniq = [...new Set(properties?.map((item) => item.propertyName))]

        if (isLibImport) {
            return `import { ${uniq.join(', ')} } from '${path}'\n`
        }

        if (dirType === 'root') {
            if (path in ALIAS) {
                return `import { ${uniq.join(', ')} } from '${ALIAS[path]}'\n`
            }
            return `import { ${uniq.join(', ')} } from '@${path}'\n`
        }

        return `import { ${uniq.join(', ')} } from '@modules/${rootDir}/${path}'\n`
    }

    private getNormalizeImportPath(path: string): string {
        const res = path.replace('.ts', '')
        if (res.endsWith('/index')) {
            return res.slice(0, -6)
        }
        if (res.endsWith('index')) {
            return res.slice(0, -5)
        }
        return res
    }

}