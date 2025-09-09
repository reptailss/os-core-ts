export interface IGmModuleModelApi {

    create(createDtoVarName: string): string

    update(updateDtoVarName: string, props: {
        filters: Record<string, string>
        returning:boolean
    }): string

    destroy(props: {
        filters: Record<string, string>
    }): string

    findOne(option: {
        filters: Record<string, string>
    }): string

    findByPk(idVarName:string): string


    pagination(paramsVarName: string): string

    getConfig(): string

    getModelVarName():string

}
