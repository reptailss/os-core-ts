import { GetConsoleLogsService } from "../../core";
import { FullUserInfo } from "../../../auth";
export declare class GetConsoleLogsController {
    private readonly getConsoleLogsService;
    constructor(getConsoleLogsService?: GetConsoleLogsService);
    getLogs(dateStart: Date, dateEnd: Date, userInfo: FullUserInfo): Promise<string[]>;
}
