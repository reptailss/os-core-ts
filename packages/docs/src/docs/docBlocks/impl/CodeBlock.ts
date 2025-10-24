import {ICodeBlock} from '@docBlocks/interfaces'
import {DocBlock} from '@docBlocks/impl/DocBlock'

export class CodeBlock<Name extends string> extends DocBlock<Name> implements ICodeBlock<Name> {
    public type = 'code' as const
    
    private fileName: string | null = null
    private templatePath: string
    
    constructor(title: Name, templatePath: string) {
        super(title)
        this.templatePath = templatePath
    }
    
    public setHeaderTitle(fileName: string | null): this {
        this.fileName = fileName
        return this
    }
    
    public getFileName(): string | null {
        return this.fileName
    }
    
    public getTemplateFilePath(): string {
        return this.templatePath
    }
}