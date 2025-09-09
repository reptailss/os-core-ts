import {GmModelNoSqlColumn, GmModelSqlColumn} from '@gm'
import {GmAbstractModuleConstant, GmModuleDto, IGmModuleConstant} from '@gm/core'
import {StringCaseHelper} from '@helpers'

export class GmModuleModelColumns extends GmAbstractModuleConstant implements IGmModuleConstant {
    
    public getPropertyName(): string {
        return `${StringCaseHelper.toSnakeUpperCase(this.getConfig().dtoName.plural)}_COLUMNS`
    }
    
    public getDirName(): string | null {
        return null
    }
    
    public getFileName(): string {
        return 'columns.ts'
    }
    
    public init(): void {
        this.addImport({
            path: 'os-core-ts',
            propertyName: this.getColumnLibType(),
            isLibImport: true,
        })
        const gmModuleDto = new GmModuleDto(this.getConfig())
        this.addModule(gmModuleDto)
        this.setType(`${this.getColumnLibType()}<${gmModuleDto.getPropertyName()}>`)
        this.setBody(`{
        ${this.gmGetColumnModelFromConfig().map(({key, column}) => {
            return `
                ${key}: ${JSON.stringify(column, null, 2)}
            `
        }).join(',\n')}
        }`)
    }
    
    public getColumnLibType() {
        return this.getConfig().model.dbType === 'noSql' ? 'ModelNoSqlColumns' : 'ModelSqlColumns'
    }
    
    private gmGetColumnModelFromConfig(): {
        key: string
        column: GmModelSqlColumn | GmModelNoSqlColumn
    }[] {
        const res: {
            key: string
            column: GmModelSqlColumn | GmModelNoSqlColumn
        }[] = []
        
        for (const key in this.getConfig().model.columns) {
            const column = this.getConfig().model.columns[key]
            res.push({
                key,
                column,
            })
        }
        return res
    }
    
    
}
