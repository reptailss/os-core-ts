import {GmAbstractModuleConstant, GmEndpointsUrlsHelper, IGmModuleConstant} from '@gm/core'
import {StringCaseHelper} from '@helpers'
import {GmConfig} from '@gm'

export class GmModuleRoutePaths extends GmAbstractModuleConstant implements IGmModuleConstant {

    constructor(config: GmConfig) {
        super(config)
    }

    public getPropertyName(): string {
        return `${StringCaseHelper.toSnakeUpperCase(this.getConfig().dtoName.plural)}_ROUTE_PATHS`
    }

    public getDirName(): string | null {
        return 'constants'
    }

    public getFileName(): string {
        return 'routePaths.ts'
    }

    public getRoutePathPropertyName(type: 'add' | 'update' | 'delete' | 'get' | 'list'): string {
        return `${this.getPropertyName()}.${type}`
    }

    public init(): void {
        if (this.getConfig().model.type === 'byDatabaseNameAndYearMonth') {
            this.setBody(`
        {
            add:'/${this.getModuleKey()}${GmEndpointsUrlsHelper.getEndpointUrl(this.getConfig(), 'add')}',
            list:'/${this.getModuleKey()}${GmEndpointsUrlsHelper.getEndpointUrl(this.getConfig(), 'list')}',
        } as const`)
        } else {
            this.setBody(`
        {
            add:'/${this.getModuleKey()}${GmEndpointsUrlsHelper.getEndpointUrl(this.getConfig(), 'add')}',
            update:'/${this.getModuleKey()}${GmEndpointsUrlsHelper.getEndpointUrl(this.getConfig(), 'update')}/:id',
            delete:'/${this.getModuleKey()}${GmEndpointsUrlsHelper.getEndpointUrl(this.getConfig(), 'delete')}/:id',
            get:'/${this.getModuleKey()}${GmEndpointsUrlsHelper.getEndpointUrl(this.getConfig(), 'get')}/:id',
            list:'/${this.getModuleKey()}${GmEndpointsUrlsHelper.getEndpointUrl(this.getConfig(), 'list')}',
        } as const`)
        }

    }

    private getModuleKey(): string {
        return StringCaseHelper.toKebabCase(this.getConfig().dtoName.plural).toLowerCase()
    }


}
