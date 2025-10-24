import {ISqlRepository} from '@repository'
import {ISqlRepositoryDynamicRegistry} from '@repository/core'


export class SqlRepositoryDynamicRegistry<
    ClassEntity extends object
> implements ISqlRepositoryDynamicRegistry<ClassEntity> {
    
    private repositories: ISqlRepository<ClassEntity>[] = []
    
    public register(repository: ISqlRepository<ClassEntity>): this {
        this.repositories.push(repository)
        return this
    }
    
    public getRepositories(): ISqlRepository<ClassEntity>[] {
        return this.repositories
    }
}