export declare class FileHelper {
    static getUniqName(props: {
        originalName: string;
        subPathStart?: string;
        subPathMiddle?: string;
    }): string;
    static getUniqName(props: {
        format: string;
        subPathStart?: string;
        subPathMiddle?: string;
    }): string;
    static getFormatFromName(name: string): string;
}
