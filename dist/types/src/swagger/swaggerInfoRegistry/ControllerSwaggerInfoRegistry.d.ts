import { ControllerSwaggerInfo } from "../core";
import { Controller } from "../../controllers";
export declare class ControllerSwaggerInfoRegistry {
    static addFromControllers({ controllers, baseSwaggerTag, }: {
        controllers: Controller[];
        baseSwaggerTag?: string;
    }): void;
    static add({ controller, baseSwaggerTag, }: {
        controller: Controller;
        baseSwaggerTag?: string;
    }): void;
    static getSwaggerInfoList(): ControllerSwaggerInfo[];
}
