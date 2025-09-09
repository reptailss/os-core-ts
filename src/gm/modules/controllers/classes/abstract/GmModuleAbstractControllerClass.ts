import {GmAbstractModuleClass, GmControllerDec, IGmModuleClass} from '@gm/core'
import {GmConfig} from '@gm'

export abstract class GmModuleAbstractControllerClass extends GmAbstractModuleClass implements IGmModuleClass {


    private className: string

    constructor(
        config: GmConfig,
        className: string,
    ) {
        super(config)
        this.className = className


    }

    public getPropertyName(): string {
        return this.className
    }

    public getDirName(): string {
        return 'controllers'
    }

    public getFileName(): string {
        return `${this.getPropertyName()}.ts`
    }

    public init(): void {
        this.addDecorator(new GmControllerDec())


    }


}