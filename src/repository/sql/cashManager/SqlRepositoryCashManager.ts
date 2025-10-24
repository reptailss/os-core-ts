import {ISqlRepository} from '@repository'
import {SqlAssociation} from '../types/include'

const repositories: Record<string, ISqlRepository<any>> = {}

export class SqlRepositoryCashManager {
    public static saveToCash<
        ClassEntity extends object,
        Includes extends Record<string, SqlAssociation<any>> = {},
    >(
        key: string,
        repository: ISqlRepository<ClassEntity,Includes>,
    ): void {
        repositories[key] = repository
    }
    
    public static getFromCash<
        ClassEntity extends object,
        Includes extends Record<string, SqlAssociation<any>> = {},
    >(key: string): ISqlRepository<ClassEntity,Includes> | null {
        if (key in repositories) {
            return repositories[key] as ISqlRepository<ClassEntity,Includes>
        }
        return null
    }
    
    public static deleteFromCash(key: string): void {
        if (key in repositories) {
            delete repositories[key]
        }
    }
    
    public static getAllFromCash(): Record<string, ISqlRepository<any>> {
        return repositories
    }
}