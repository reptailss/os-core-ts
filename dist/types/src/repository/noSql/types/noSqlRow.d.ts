import { Entity } from "../../../entity";
export type NoSqlRow<ClassEntity extends object, ReturnAttributes extends Array<keyof Entity<ClassEntity>> | undefined = undefined> = ReturnAttributes extends Array<keyof Entity<ClassEntity>> ? Pick<Entity<ClassEntity>, ReturnAttributes[number]> : Entity<ClassEntity>;
