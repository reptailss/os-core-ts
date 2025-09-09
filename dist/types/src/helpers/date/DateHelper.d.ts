export declare class DateHelper {
    static getCurrentMonth(): number;
    static getCurrentYear(): number;
    static getMonthAndYearFromDate(date: Date): {
        month: number;
        year: number;
    };
    static generateDateIntervalsYearAndMonthByRange(start: string | Date, end: string | Date): {
        year: number;
        month: string;
    }[];
    static generateDateIntervalsByDayRange(start: string | Date, end: string | Date): {
        year: number;
        month: string;
        day: string;
    }[];
    static getDateFormat(format?: 'y-m-d h:i:s' | 'd-m-y' | 'd-m-y h:i:s', date?: Date | null): string;
    static isDateInFuture(date: Date): boolean;
    static isDateInPast(date: Date): boolean;
}
