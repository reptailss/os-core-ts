import React, {useState} from 'react';
import Stack from '@mui/material/Stack';
import RefreshIcon from "@mui/icons-material/Refresh";
import IconButton from "@mui/material/IconButton";
import Spinner from '@ui/spinner/Spinner';
import NotFoundMessage from "@ui/notFoundMesssage/NotFoundMessage";
import {useShowError} from "@hooks/useShowError";
import {
    OnReadBtnClickMobAppNotificationSettings,
    OnSaveMobAppNotificationSettings
} from "@packages/mobAppSettings/containers/notificationSettings/types/events";
import {
    updateMobAppNotificationSettings
} from "@packages/mobAppSettings/containers/notificationSettings/api/notificationSettings";
import {useGetMobAppKeys} from "@packages/mobAppSettings/containers/notificationSettings/hooks/UseGetMobAppKeys";
import MobAppNotificationSettingsList
    from "@packages/mobAppSettings/containers/notificationSettings/list/MobAppNotificationSettingsList";
import MutateMobAppNotificationSettingsModal
    from "@packages/mobAppSettings/containers/notificationSettings/mutateMobAppNotificationSettings/MutateMobAppNotificationSettingsModal";


const MobAppNotificationSettings = () => {

    const [openModal, setOpenModal] = useState<boolean>(false)
    const [targetMobAppKey, setTargetMobAppKey] = useState<string | null>(null)

    const {
        mobAppKeys,
        fetchMobAppKeys,
        isLoading
    } = useGetMobAppKeys()

    const {onShowError} = useShowError()

    const onReadBtnClick: OnReadBtnClickMobAppNotificationSettings = async (appKey) => {
        setTargetMobAppKey(appKey)
        setOpenModal(true)
    }

    const onSave: OnSaveMobAppNotificationSettings = async (body) => {
        try {
            await updateMobAppNotificationSettings(body)
            setTargetMobAppKey(null)
            setOpenModal(false)
        } catch (error) {
            onShowError(error)
        }
    }

    return (
        <Stack
            gap={1}
        >
            {isLoading && <Spinner variant={'overlay'}/>}

            {openModal && <MutateMobAppNotificationSettingsModal
                onSave={onSave}
                targetMobAppKey={targetMobAppKey}
                open={openModal}
                setOpen={setOpenModal}
            />}

            <Stack
                direction={'row'}
                alignItems={'center'}
                justifyContent={'flex-end'}
                gap={1}
            >
                <IconButton
                    onClick={fetchMobAppKeys}
                >
                    <RefreshIcon/>
                </IconButton>
            </Stack>

            {!mobAppKeys?.length && !isLoading && <NotFoundMessage/>}

            <MobAppNotificationSettingsList
                mobAppKeys={mobAppKeys}
                onReadBtnClick={onReadBtnClick}
            />
        </Stack>
    );
};

export default MobAppNotificationSettings;