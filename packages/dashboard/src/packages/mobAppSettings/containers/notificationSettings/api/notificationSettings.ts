import {apiRequestWithAuth} from "@helpers/query/apiRequestWithAuth";
import {serialize} from "@helpers/query/serialize";
import {
    BodyUpdateNotificationSettings,
    PropsGetNotificationSettingsByAppKey,
    ResponseGetMobAppSettingsByAppKey,
    ResponseMobApps
} from "@packages/mobAppSettings/containers/notificationSettings/types";
import {getRootApiUrl} from "@helpers/apiUrl/getRootApiUrl";


export const getMobAppNotificationSettings = async (): Promise<ResponseMobApps> => {
    return await apiRequestWithAuth<ResponseMobApps>({
        url: `${getRootApiUrl()}get-all-app-keys?`,
        options: {
            method: 'GET',
        },
    })
}


export const updateMobAppNotificationSettings = async ({app_key, ...body}: BodyUpdateNotificationSettings) => {
    return await apiRequestWithAuth({
        url: `${getRootApiUrl()}update-notification-settings?` + serialize({
            app_key,
        }),
        options: {
            method: 'PUT',
            headers: {
                'content-type': "application/json",
            },
            body: JSON.stringify(body)
        },
    })
}


export const getMobAppNotificationSettingsByAppKey = async (params: PropsGetNotificationSettingsByAppKey): Promise<ResponseGetMobAppSettingsByAppKey> => {
    return await apiRequestWithAuth<ResponseGetMobAppSettingsByAppKey>({
        url: `${getRootApiUrl()}get-notification-settings?` + serialize(params),
        options: {
            method: 'GET',
        },
    })
}
