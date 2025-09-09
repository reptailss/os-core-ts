import { Controller } from "../../../controllers";
export declare class RequestsLogsRoutesRegistry {
    static addFromControllers(controllers: Controller[]): void;
    static add(controller: Controller): void;
    static getRoutePaths(): string[];
}
