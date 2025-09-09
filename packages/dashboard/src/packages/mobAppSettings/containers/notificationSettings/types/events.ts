import {BodyUpdateNotificationSettings} from "@packages/mobAppSettings/containers/notificationSettings/types/index";

export type OnReadBtnClickMobAppNotificationSettings = (appKey: string) => Promise<void>
export type OnSaveMobAppNotificationSettings = (
    body: BodyUpdateNotificationSettings
) => Promise<void>