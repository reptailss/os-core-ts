export declare class GmObjectStringifyHelper {
    static objectToString(obj: object): string;
    static objectToStringWithoutValueQuotes(obj: object): string;
    static objectOptionsToString: (object: Record<string, unknown | object | (string[]) | undefined>, hasWrapper?: boolean) => string;
}
