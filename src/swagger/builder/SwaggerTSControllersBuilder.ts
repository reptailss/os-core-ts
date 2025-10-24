import glob from 'glob'
import path from 'path'
import {MethodInfoBuildTSSchema, SwaggerHelper, SwaggerTSHelper} from '@swagger/core'
import fs from 'fs'
import * as ts from 'typescript'


const DECORATOR_METHODS_NAMES = [
    'Post',
    'Get',
    'Delete',
    'Put',
    'SystemPost',
    'SystemGet',
    'SystemDelete',
    'SystemPut',
]


export class SwaggerTSControllersBuilder {
    
    
    public buildAndSaveToFile(appDirPath?: string,modulesDir?:string) {
        this.saveResponseAndParamsToFile(
            this.getResponseAndParams(appDirPath,modulesDir),
            appDirPath,
        )
    }
    
    public deleteFromFile(appDirPath?:string): void {
        const {dirPath} = SwaggerHelper.getTSResultAndParamsPaths(appDirPath)
        try {
            fs.rmSync(dirPath, {recursive: true, force: true})
        } catch (error) {
            console.log(error)
        }
    }
    
    private getResponseAndParams(appDirPath?: string,modulesDir?:string) {
        const rootDir = appDirPath || 'src'
        return this.generateFileByMethods(this.extractControllersBuildTsSchema(
            this.getFilePaths(appDirPath,modulesDir),
            path.join(process.cwd(), ...rootDir.split('/'), modulesDir || 'modules')),
        )
    }
    
    private getFilePaths(appDirPath?: string,modulesDir?:string) {
        const modules = modulesDir || 'modules'
        const controllersFilesPattern = appDirPath ? [`${appDirPath}/${modules}/**/controllers/**/*.ts`] : [`src/${modules}/**/controllers/**/*.ts`]
        return ([] as string[]).concat(
            ...controllersFilesPattern.map((f) => glob.sync(f)),
        ).map((value) => {
            while (value.substr(0, 2) === './') {
                value = value.substr(2)
            }
            return value
        })
    }
    
    private extractControllersBuildTsSchema(filePaths: string[], rootPath: string): MethodInfoBuildTSSchema[] {
        const result: MethodInfoBuildTSSchema[] = []
        filePaths.forEach((filePath) => {
            const sourceFile = ts.createSourceFile(
                filePath,
                ts.sys.readFile(filePath) || '',
                ts.ScriptTarget.ESNext,
                true,
            )
            
            ts.forEachChild(sourceFile, (node) => {
                if (ts.isClassDeclaration(node) && node.name) {
                    const className = node.name.text
                    const classDecorators = ts.getDecorators(node) || []
                    const hasControllerDec = classDecorators.some((decorator) => {
                        return this.isDecoratorNamed(decorator, 'Controller') ||
                            this.isDecoratorNamed(decorator, 'SystemController')
                    })
                    
                    if (hasControllerDec) {
                        const methods: {
                            name: string,
                            hasReturnType: boolean
                        }[] = []
                        
                        node.members.forEach((member) => {
                            if (
                                ts.isMethodDeclaration(member) &&
                                member.name &&
                                ts.isIdentifier(member.name)
                            ) {
                                const methodDecorators = ts.getDecorators(member) || []
                                const hasHttpDecorator = methodDecorators.some((decorator) =>
                                    DECORATOR_METHODS_NAMES.some((name) =>
                                        this.isDecoratorNamed(decorator, name),
                                    ),
                                )
                                if (!hasHttpDecorator) {
                                    return
                                }
                                const returnType = member.type
                                const isVoidMethod = !returnType || (
                                    returnType.kind === ts.SyntaxKind.VoidKeyword ||
                                    (ts.isTypeReferenceNode(returnType) &&
                                        (returnType.typeName.getText() === 'void' ||
                                            returnType.typeName.getText() === 'Promise' &&
                                            returnType.typeArguments?.[0]?.getText() === 'void'))
                                
                                )
                                methods.push({
                                    name: member.name.text,
                                    hasReturnType: !isVoidMethod,
                                    
                                })
                            }
                        })
                        
                        if (methods.length > 0) {
                            const relativeFilePath = path.relative(rootPath, filePath)
                            result.push({
                                className,
                                methods,
                                filePath: relativeFilePath,
                            })
                        }
                    }
                }
            })
        })
        
        return result
    }
    
    private isDecoratorNamed(decorator: ts.Decorator, name: string): boolean {
        if (ts.isCallExpression(decorator.expression)) {
            const {expression} = decorator.expression
            return ts.isIdentifier(expression) && expression.text === name
        }
        return false
    }
    
    private generateFileByMethods(data: MethodInfoBuildTSSchema[]): string {
        if (!data?.length) {
            return ''
        }
        const importsValues = data.map((controller) => {
            const normalPath = controller.filePath.replace(/\\/g, '/').replace('.ts', '')
            return `import{ ${controller.className} } from '@modules/${normalPath}'`
        })?.join('\n')
        
        const types = data.map((controller) => {
            return controller.methods?.map((method) => {
                const paramTypeName = SwaggerTSHelper.getParamsKeyBuildTsSchema({
                    method: method.name,
                    className: controller.className,
                })
                if (!method.hasReturnType) {
                    return `type ${paramTypeName} = Parameters<${controller.className}['${method.name}']>`
                }
                const responseTypeName = SwaggerTSHelper.getResponseKeyBuildTsSchema({
                    method: method.name,
                    className: controller.className,
                })
                return `type ${paramTypeName} = Parameters<${controller.className}['${method.name}']>\ntype ${responseTypeName} = Awaited<ReturnType<${controller.className}['${method.name}']>>`
            })?.join('\n')
        })?.join('\n')
        
        return `${importsValues}\n${types}`
    }
    
    private saveResponseAndParamsToFile(types: string, appDirPath?: string) {
        const {filePath, dirPath} = SwaggerHelper.getTSResultAndParamsPaths(appDirPath)
        
        if (!fs.existsSync(dirPath)) {
            fs.mkdirSync(dirPath, {recursive: true})
        }
        
        fs.writeFile(
            filePath,
            types,
            'utf8',
            (error) => {
                if (error) {
                    console.error(error)
                }
            })
        
    }
    
    
}