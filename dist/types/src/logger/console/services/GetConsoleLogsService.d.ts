export declare class GetConsoleLogsService {
    getLogs({ dateEnd, dateStart, }: {
        dateStart: Date;
        dateEnd: Date;
    }): Promise<string[]>;
}
