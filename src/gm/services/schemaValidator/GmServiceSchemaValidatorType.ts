import {GmAbstractServiceFn, GmExport, IGmService} from '@gm/core'

export class GmServiceSchemaValidatorType extends GmAbstractServiceFn implements IGmService {
    public getExport(): GmExport {
        return {
            path: 'os-core-ts',
            propertyName: 'SchemaValidator',
            isLibImport: true,
        }
    }

    public getServiceName(): string {
        return 'SchemaValidator'
    }

    getSchemaValidatorType(baseType: string): string {
        return `SchemaValidator<${baseType}>`
    }

}
