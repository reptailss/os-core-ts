import {GmObjectStringifyHelper, IGmModuleModelApi} from '@gm/core'


export class GmModuleModeApiNoSql implements IGmModuleModelApi {

    private readonly modelVarName: string

    constructor(modelVarName: string) {
        this.modelVarName = modelVarName
    }


    public create(createDtoVarName: string): string {
        return `${this.modelVarName}.create(${createDtoVarName})`
    }

    public update(updateDtoVarName: string, props: {
        filters: Record<string, string>
        returning:boolean
    }): string {
        return `${this.modelVarName}.update(${updateDtoVarName},
                     {
                           filters:${GmObjectStringifyHelper.objectOptionsToString(props.filters)},
                           returning:${props.returning ? 'true' : 'false'}
                      }
                )`
    }

    public destroy(props: {
        filters: Record<string, string>,
    }): string {

        return `${this.modelVarName}.destroy({
                           filters:${GmObjectStringifyHelper.objectOptionsToString(props.filters)}
                      })`
    }

    public findOne(props: {
        filters: Record<string, string>
    }): string {
        return `${this.modelVarName}.findOne({
                           filters:${GmObjectStringifyHelper.objectOptionsToString(props.filters)}
                      })`
    }

    public findByPk(idVarName: string): string {
        return `${this.modelVarName}.findByPk(${idVarName})`
    }

    public pagination(paramsVarName: string): string {
        return `${this.modelVarName}.pagination(${paramsVarName})`
    }


    public getConfig(): string {
        return `${this.modelVarName}.getConfig()`
    }

    public getModelVarName(): string {
        return  this.modelVarName
    }

}



