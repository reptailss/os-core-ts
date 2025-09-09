import React from 'react';
import Grid2 from '@mui/material/Grid2';
import {
    OnReadBtnClickMobAppNotificationSettings
} from "@packages/mobAppSettings/containers/notificationSettings/types/events";
import MobAppNotificationSettingsItem
    from "@packages/mobAppSettings/containers/notificationSettings/list/MobAppNotificationSettingsItem";

interface Props {
    mobAppKeys: string[]
    onReadBtnClick: OnReadBtnClickMobAppNotificationSettings
}

const MobAppNotificationSettingsList = ({
                                            mobAppKeys,
                                            onReadBtnClick,
                                        }: Props) => {

    const list = mobAppKeys?.length >= 1 && mobAppKeys?.map((mobAppKey) => {
        return (
            <MobAppNotificationSettingsItem
                mobAppKey={mobAppKey}
                onReadBtnClick={onReadBtnClick}
            />
        )
    })
    return (
        <Grid2
            container
            spacing={2}
        >
            {list}
        </Grid2>
    );
};

export default MobAppNotificationSettingsList;