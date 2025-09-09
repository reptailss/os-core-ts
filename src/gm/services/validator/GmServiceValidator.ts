import {GmExport, GmObjectStringifyHelper, IGmService} from '@gm/core'

export class GmServiceValidator implements IGmService {
    public serviceType = 'fn' as const


    public getExport(): GmExport {
        return {
            path: 'os-core-ts',
            propertyName: 'Validator',
            isLibImport: true,
        }
    }

    public getServiceName(): string {
        return 'Validator'
    }


    public object(fields: Record<string, string>) {
        return `Validator.object(${GmObjectStringifyHelper.objectToStringWithoutValueQuotes(fields)})`
    }

    public string(min?: number, max?: number):string {

        let base = 'Validator.string()'

        if (min) {
            base += `.min(${min})`
        }

        if (max) {
            base += `.max(${max})`
        }

        return base
    }

    public number(min?: number, max?: number):string {

        let base = 'Validator.number()'

        if (min) {
            base += `.min(${min})`
        }

        if (max) {
            base += `.max(${max})`
        }

        return base
    }

    public date() :string{
        return 'Validator.date()'
    }

    public boolean():string {
        return 'Validator.boolean()'
    }

}
