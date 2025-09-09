import React from 'react';
import Box from '@mui/material/Box';
import {sx} from './sx'
import MobAppNotificationSettings
    from "@packages/mobAppSettings/containers/notificationSettings/MobAppNotificationSettings";

const MobAppSettingsNotificationPage = () => {
    return (
        <Box
            sx={sx.root}
        >
            <MobAppNotificationSettings/>
        </Box>
    );
};

export default MobAppSettingsNotificationPage;