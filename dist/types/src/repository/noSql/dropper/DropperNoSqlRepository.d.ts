interface DropperRepository {
    dropCollection(): Promise<void>;
    getConfig(): {
        database: string;
        host: string;
        port: string;
        dbType: 'mongodb';
        tableName: string;
    };
    count(props: {}): Promise<number>;
}
export declare class DropperNoSqlRepository {
    static drop(repository: DropperRepository): Promise<number>;
    static multiDropByYearMonthDateRange({ loaderRepository, dateStart, dateEnd, }: {
        loaderRepository: {
            load: (month: number, year: number) => Promise<DropperRepository>;
        };
        dateStart: Date;
        dateEnd: Date;
    }): Promise<{
        collectionsCount: number;
        documentsCount: number;
    }>;
}
export {};
