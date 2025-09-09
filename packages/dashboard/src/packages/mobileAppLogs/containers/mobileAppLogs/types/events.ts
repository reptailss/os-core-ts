import {MobileAppLog, GetMobileAppLogsParams} from "@packages/mobileAppLogs/containers/mobileAppLogs/types/index";

export type GetMobileAppLogs = (props: GetMobileAppLogsParams) => Promise<MobileAppLog[]>