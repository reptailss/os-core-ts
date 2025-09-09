import {
    GmCodeBuilder,
    GmFileWriteMode,
    GmModuleDirType,
    GmRenderModuleClass,
    GmRenderModuleClassMethod,
    GmRenderModuleConstant,
    GmRenderModuleFn,
    GmRenderModuleType,
    IGmModule,
    IGmModuleClass,
    IGmModuleClassMethod,
    IGmModuleConstant,
    IGmModuleFn,
    IGmModuleType,
} from '@gm/core'
import path from 'path'
import fs from 'fs'

let writtenModules: Record<string, boolean> = {}

export class GmCreateFile {
    private module: IGmModule
    private readonly gmCodeBuilder = new GmCodeBuilder()
    
    constructor(
        module: IGmModule,
    ) {
        this.module = module
    }
    
    public run() {
        this.writeModule(this.module)
    }
    
    private writeModule(module: IGmModule, parentDirName?: string | null) {
        
        if (this.checkIsClassModule(module)) {
            if (module.getMethods().length) {
                module.getMethods().forEach(method => {
                    this.writeModule(method, parentDirName)
                })
            }
        }
        
        if (module.getModules().length) {
            this.createChildModules(module.getModules(), parentDirName)
        }
        
        if (module.getChildModules().length) {
            if (this.checkIsWriteModule(module)) {
                const dirName = module.getDirName()
                const dirNameWithParent = dirName ? `${parentDirName}/${dirName}` : parentDirName
                const currentParentDirName = parentDirName ? dirNameWithParent : dirName
                this.createChildModules(module.getChildModules(), currentParentDirName)
            } else {
                this.createChildModules(module.getChildModules(), parentDirName)
            }
        }
        
        if (
            !this.checkIsWriteModule(module) ||
            this.isModuleWritten(module.constructor.name)
        ) {
            return
        }
        
        this.markModuleAsWritten(module.constructor.name)
        this.checkAndCreateFolder(this.getOutputPath({
            modulePath: module.getDirName(),
            parentDirName,
            dirType: module.getDirType(),
        }))
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
        })
        
    }
    
    private checkIsClassModule(module: IGmModule): module is IGmModuleClass {
        return module.moduleType === 'class'
    }
    
    private checkIsWriteModule(module: IGmModule): module is (IGmModuleClass | IGmModuleConstant | IGmModuleFn | IGmModuleType) {
        return module.moduleType === 'type' ||
            module.moduleType === 'constant' ||
            module.moduleType === 'class' ||
            module.moduleType === 'fn'
    }
    
    private getDataByModule(module: IGmModule) {
        switch (module.moduleType) {
            case 'constant': {
                return {
                    gmRenderModuleConstant: new GmRenderModuleConstant(module as IGmModuleConstant),
                }
            }
            case 'fn': {
                return {
                    gmRenderModuleFn: new GmRenderModuleFn(module as IGmModuleFn),
                }
            }
            case 'classMethod': {
                return {
                    gmRenderModuleClassMethod: new GmRenderModuleClassMethod(module as IGmModuleClassMethod),
                }
            }
            case 'class': {
                return {
                    gmRenderModuleClass: new GmRenderModuleClass(module as IGmModuleClass),
                }
            }
            
            case 'type': {
                return {
                    gmRenderModuleType: new GmRenderModuleType(module as IGmModuleType),
                }
            }
        }
    }
    
    private getBasePath(dirType: GmModuleDirType): string {
        const rootDir = this.module.getConfig().rootDir || 'src'
        const rootDirArray = rootDir.split('/')
        switch (dirType) {
            case 'modules':
                return path.resolve(process.cwd(), ...rootDirArray, 'modules', this.module.getRootModuleDirName())
            case 'root' :
                return path.resolve(process.cwd(), ...rootDirArray)
            default:
                return ''
        }
    }
    
    private getOutputPath({
                              modulePath,
                              parentDirName,
                              dirType,
                          }: {
        modulePath: string | null
        parentDirName?: string | null
        dirType: GmModuleDirType
    }): string {
        const basePath = this.getBasePath(dirType)
        if (parentDirName) {
            if (modulePath) {
                return path.join(basePath, ...parentDirName.split('/'), path.join(...modulePath.split('/')))
            }
            return path.join(basePath, ...parentDirName.split('/'))
        }
        return modulePath ? path.join(basePath, ...modulePath.split('/')) : ''
    }
    
    private markModuleAsWritten(moduleName: string): this {
        writtenModules[moduleName] = true
        return this
    }
    
    private isModuleWritten(moduleName: string): boolean {
        return moduleName in writtenModules && writtenModules[moduleName]
    }
    
    private createChildModules(childModules: IGmModule[], parentDirName?: string | null) {
        for (const module of childModules) {
            this.writeModule(module, parentDirName)
        }
    }
    
    private checkAndCreateFolder(path: string) {
        if (!path || fs.existsSync(path)) {
            return
        }
        fs.mkdirSync(path, {recursive: true})
    }
    
    private writeFileModule({
                                outputPath,
                                templatePath,
                                data,
                                fileWriteModeGm,
                                name,
                            }: {
        outputPath: string,
        templatePath: string,
        data: Record<string, unknown>,
        fileWriteModeGm: GmFileWriteMode,
        name: string
    }): void {
        
        if (fs.existsSync(outputPath) && fileWriteModeGm === 'skipIfExists') {
            return
        }
        const formattedCode = this.gmCodeBuilder.build({
            templatePath,
            data,
        })
        
        this.saveFile({
            outputPath,
            fileWriteModeGm,
            formattedCode,
            name,
        })
    }
    
    private saveFile({
                         fileWriteModeGm,
                         outputPath,
                         formattedCode,
                         name,
                     }: {
        fileWriteModeGm: GmFileWriteMode,
        outputPath: string,
        formattedCode: string,
        name: string
    }): void {
        if (fs.existsSync(outputPath)) {
            switch (fileWriteModeGm) {
                case 'skipIfExists':
                    return
                case 'overwrite':
                    fs.writeFileSync(outputPath, formattedCode, 'utf-8')
                    break
                case 'appendBefore': {
                    this.appendFileModule({
                        outputPath,
                        code: formattedCode,
                        type: 'appendBefore',
                        name,
                    })
                    break
                }
                case 'appendAfter': {
                    this.appendFileModule({
                        outputPath,
                        code: formattedCode,
                        type: 'appendAfter',
                        name,
                    })
                    break
                }
            }
            return
        }
        
        fs.writeFileSync(outputPath, formattedCode, 'utf-8')
    }
    
    private appendFileModule({
                                 outputPath,
                                 code,
                                 type,
                                 name,
                             }: {
        outputPath: string,
        code: string,
        type: 'appendBefore' | 'appendAfter'
        name: string
    }) {
        const existingContent = fs.readFileSync(outputPath, 'utf-8')
        const newContent = type === 'appendBefore' ? this.combineAndOptimizeImports([code, existingContent]) : this.combineAndOptimizeImports([existingContent, code])
        fs.writeFileSync(outputPath, newContent, 'utf-8')
    }
    
    private combineAndOptimizeImports(codeBlocks: string[]): string {
        
        const importMap: Record<string, Set<string>> = {}
        const fullCode = codeBlocks.join('\n')
        
        const importRegex = /import\s*\{[^}]*\}\s*from\s*['"][^'"]+['"];?/g
        let match: RegExpExecArray | null
        
        while ((match = importRegex.exec(fullCode)) !== null) {
            const fullImport = match[0]
            const innerMatch = fullImport.match(/import\s*\{([^}]+)\}\s*from\s*['"]([^'"]+)['"]/)
            if (!innerMatch) continue
            
            const [, importsBlock, source] = innerMatch
            const imports = importsBlock
                .split(',')
                .map(name => name.trim())
                .filter(Boolean)
            
            if (!importMap[source]) {
                importMap[source] = new Set()
            }
            
            for (const imp of imports) {
                importMap[source].add(imp)
            }
        }
        
        let codeWithoutImports = fullCode.replace(importRegex, '')
        
        const originalLines = codeWithoutImports.split('\n')
        
        const hadLeadingEmpty = originalLines.length > 0 && originalLines[0].trim() === ''
        const hadTrailingEmpty = originalLines.length > 0 && originalLines[originalLines.length - 1].trim() === ''
        
        const trimmedLines = [...originalLines]
        while (trimmedLines.length > 0 && trimmedLines[0].trim() === '') trimmedLines.shift()
        while (trimmedLines.length > 0 && trimmedLines[trimmedLines.length - 1].trim() === '') trimmedLines.pop()
        
        const compactedLines: string[] = []
        let emptyCount = 0
        
        for (const line of trimmedLines) {
            if (line.trim() === '') {
                emptyCount++
                if (emptyCount <= 2) {
                    compactedLines.push('')
                }
            } else {
                emptyCount = 0
                compactedLines.push(line)
            }
        }
        
        if (hadLeadingEmpty) compactedLines.unshift('')
        if (hadTrailingEmpty) compactedLines.push('')
        
        const cleanedCode = compactedLines.join('\n')
        
        const combinedImports = Object.entries(importMap)
            .map(([source, imports]) => `import { ${Array.from(imports).join(', ')} } from '${source}';`)
            .join('\n')
        
        return `${combinedImports}\n\n${cleanedCode}`
    }
    
    
}
