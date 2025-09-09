export interface BodyUpdateNotificationSettings {
    project_id: string
    private_key: string
    client_email: string
    app_key: string
}

export interface ResponseGetMobAppSettingsByAppKey {
    row: {
        project_id: string
        private_key: string
        client_email: string
    }
}


export interface ResponseMobApps {
    rows: string[]
}


export interface PropsGetNotificationSettingsByAppKey {
    app_key: string
}