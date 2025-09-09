export const SYSTEM_ROUTES = {
    osLogs: {
        index: '/os-logs',
    },
    osRequestsInfo: {
        index: '/os-requests-info',
    },
    osImportOsStatusRequestsLogs: {
        index: '/import-os-status-requests',
    },
    dashboard: {
        index: '/dashboard*',
        bundleJs: '/dashboard/main.js',
        favicon: '/dashboard/favicon.ico',
    },
    swagger: {
        index: '/swagger*',
        swaggerSpec: '/swagger/swaggerSpec',
        bundleJs: '/swagger/main.js',
        favicon: '/swagger/favicon.ico',
    },
    health: {
        liveness: '/liveness',
        osStatus: '/os-status',
        readiness: '/readiness',
    },
} as const