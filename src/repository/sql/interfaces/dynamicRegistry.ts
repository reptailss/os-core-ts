import {ISqlRepository} from '@repository'

export interface ISqlRepositoryDynamicRegistry<
    ClassEntity extends object
> {
    register(repository: ISqlRepository<ClassEntity>): this
    
    getRepositories(): ISqlRepository<ClassEntity>[]
}