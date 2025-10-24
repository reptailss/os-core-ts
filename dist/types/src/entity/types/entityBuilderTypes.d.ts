import { DateAdd, DateUpdate, PrimaryNumberKey, PrimaryStringKey } from "..";
export type Entity<ClassEntity> = {
    [key in keyof ClassEntity]: ClassEntity[key] extends PrimaryNumberKey ? number : ClassEntity[key] extends PrimaryStringKey ? string : ClassEntity[key] extends DateAdd ? Date : ClassEntity[key] extends DateUpdate ? Date : ClassEntity[key];
};
type SpecialTypes = PrimaryNumberKey | PrimaryStringKey | DateAdd | DateUpdate;
export type CreateEntity<ClassEntity extends object> = Omit<ClassEntity, {
    [K in keyof ClassEntity]: ClassEntity[K] extends SpecialTypes ? K : never;
}[keyof ClassEntity]>;
export type UpdateEntity<ClassEntity extends object> = Partial<CreateEntity<ClassEntity>>;
export {};
