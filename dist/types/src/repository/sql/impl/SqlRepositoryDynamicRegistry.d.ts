import { ISqlRepository } from "../..";
import { ISqlRepositoryDynamicRegistry } from "../../core";
export declare class SqlRepositoryDynamicRegistry<ClassEntity extends object> implements ISqlRepositoryDynamicRegistry<ClassEntity> {
    private repositories;
    register(repository: ISqlRepository<ClassEntity>): this;
    getRepositories(): ISqlRepository<ClassEntity>[];
}
