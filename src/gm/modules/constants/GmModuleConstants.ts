import {GmAbstractModuleConstant, GmFileWriteMode, IGmModuleConstant} from '@gm/core'
import {GmConfig} from '@gm'


export class GmModuleConstants extends GmAbstractModuleConstant implements IGmModuleConstant {

    private value: string
    private mode: GmFileWriteMode | null = null
    private propertyName: string
    private hasDir: boolean = false
    private fileName: string | null = null

    constructor(
        {
            config,
            value,
            propertyName,
            hasDir,
            fileName,
            mode,
        }: {
            config: GmConfig
            value: string
            propertyName: string
            hasDir?: boolean
            fileName?: string
            mode?: GmFileWriteMode
        },
    ) {
        super(config)
        this.propertyName = propertyName
        this.hasDir = hasDir || false
        this.fileName = fileName || null
        this.mode = mode || null
        this.value = value

    }

    public getPropertyName(): string {
        return this.propertyName
    }

    public getDirName(): string | null {
        return this.hasDir ? 'constants' : null
    }

    public getFileName(): string {
        if (this.fileName) {
            return this.fileName
        }
        if (this.hasDir) {
            return 'index.ts'
        }
        return 'constants.ts'
    }

    public init(): void {
        this.setBody(`'${this.value}'`)
        if (this.mode) {
            this.setFileWriteMode(this.mode)
        }
    }

}
