import { GmAbstractModuleType, GmModuleCreateDto, IGmModuleType} from '@gm/core'
import {StringCaseHelper} from '@helpers'
import {GmConfig} from '@gm'


export class GmModuleUpdateDto extends GmAbstractModuleType implements IGmModuleType {

    private readonly gmModuleCreateDto: GmModuleCreateDto

    constructor(
        config: GmConfig,
    ) {
        super(config)
        this.gmModuleCreateDto = new GmModuleCreateDto(config)
    }

    public getPropertyName(): string {
        return `Update${StringCaseHelper.toPascalCase(this.getConfig().dtoName.singular)}Dto`
    }

    public getDirName(): string {
        return this.gmModuleCreateDto.getDirName()
    }

    public getFileName(): string {
        return this.gmModuleCreateDto.getFileName()
    }

    public init(): void {
        this.addModule(this.gmModuleCreateDto, {
            hasAddImport: false,
        })
        this.setFileWriteMode('appendBefore')
        this.setBody(`Partial<${this.gmModuleCreateDto.getPropertyName()}>`)
    }
}
