import { ISqlRepository } from "../..";
import { SqlAssociation } from '../types/include';
export declare class SqlRepositoryCashManager {
    static saveToCash<ClassEntity extends object, Includes extends Record<string, SqlAssociation<any>> = {}>(key: string, repository: ISqlRepository<ClassEntity, Includes>): void;
    static getFromCash<ClassEntity extends object, Includes extends Record<string, SqlAssociation<any>> = {}>(key: string): ISqlRepository<ClassEntity, Includes> | null;
    static deleteFromCash(key: string): void;
    static getAllFromCash(): Record<string, ISqlRepository<any>>;
}
