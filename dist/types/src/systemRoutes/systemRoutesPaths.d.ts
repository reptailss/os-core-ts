export declare const SYSTEM_ROUTES: {
    readonly osLogs: {
        readonly index: "/os-logs";
    };
    readonly osRequestsInfo: {
        readonly index: "/os-requests-info";
    };
    readonly osImportOsStatusRequestsLogs: {
        readonly index: "/import-os-status-requests";
    };
    readonly dashboard: {
        readonly index: "/dashboard*";
        readonly bundleJs: "/dashboard/main.js";
        readonly favicon: "/dashboard/favicon.ico";
    };
    readonly swagger: {
        readonly index: "/swagger*";
        readonly swaggerSpec: "/swagger/swaggerSpec";
        readonly bundleJs: "/swagger/main.js";
        readonly favicon: "/swagger/favicon.ico";
    };
    readonly health: {
        readonly liveness: "/liveness";
        readonly osStatus: "/os-status";
        readonly readiness: "/readiness";
    };
};
