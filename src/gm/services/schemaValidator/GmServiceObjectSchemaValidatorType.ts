import {GmAbstractServiceFn, GmExport, IGmService} from '@gm/core'

export class GmServiceObjectSchemaValidatorType extends GmAbstractServiceFn implements IGmService {
    public getExport(): GmExport {
        return {
            path: 'os-core-ts',
            propertyName: 'ObjectSchemaValidator',
            isLibImport: true,
        }
    }

    public getServiceName(): string {
        return 'ObjectSchemaValidator'
    }

    getSchemaValidatorType(baseType: string): string {
        return `ObjectSchemaValidator<${baseType}>`
    }

}
