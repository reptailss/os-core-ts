import { ControllerMeta } from "../../../controllers";
export declare class RequestsLogsRoutesRegistry {
    static addFromControllers(controllers: ControllerMeta[]): void;
    static add(controller: ControllerMeta): void;
    static getRoutePaths(): string[];
}
