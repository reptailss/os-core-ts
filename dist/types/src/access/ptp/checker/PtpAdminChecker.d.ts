export declare class PtpAdminChecker {
    static coreOrClient({ openUserId, domain, }: {
        openUserId: number;
        domain: string;
    }): Promise<'ptp-core' | 'ptp-client'>;
    static coreOrClientAndDomainIfNotCore({ openUserId, domain, apiSecretKey, apiAccessKey, }: {
        openUserId: number;
        domain: string;
        apiAccessKey: string;
        apiSecretKey: string;
    }): Promise<{
        ptpGroupId: number;
        ptpGroupCityId: number;
    }>;
}
