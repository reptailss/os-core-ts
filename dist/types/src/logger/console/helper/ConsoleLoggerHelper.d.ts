export declare class ConsoleLoggerHelper {
    static getFilePath: (props: {
        year: number;
        month: string;
        day: string;
    }) => string;
    static getDirPath: () => string;
    static getFileNameByDate({ year, month, day, }: {
        year: number;
        month: string;
        day: string;
    }): string;
    static getFileName(): string;
    static getDatePattern(): string;
}
