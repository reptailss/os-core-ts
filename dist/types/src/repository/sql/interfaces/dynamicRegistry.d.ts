import { ISqlRepository } from "../..";
export interface ISqlRepositoryDynamicRegistry<ClassEntity extends object> {
    register(repository: ISqlRepository<ClassEntity>): this;
    getRepositories(): ISqlRepository<ClassEntity>[];
}
