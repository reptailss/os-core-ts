import { FullUserDto } from "../../../auth";
export declare class GetConsoleLogsController {
    private readonly getConsoleLogsService;
    getLogs(dateStart: Date, dateEnd: Date, userDto: FullUserDto): Promise<string[]>;
}
