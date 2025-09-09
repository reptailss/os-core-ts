import React, {useEffect, useLayoutEffect, useState} from 'react';
import Stack from "@mui/material/Stack";
import {TextField} from "@mui/material";
import Button from "@mui/material/Button";
import {OnSaveMobAppNotificationSettings} from "@packages/mobAppSettings/containers/notificationSettings/types/events";
import {
    getMobAppNotificationSettingsByAppKey
} from "@packages/mobAppSettings/containers/notificationSettings/api/notificationSettings";
import Spinner from '@ui/spinner/Spinner';


interface Props {
    onSave: OnSaveMobAppNotificationSettings
    targetMobAppKey: string | null
}

const MutateMobAppNotificationSettings = ({
                                              onSave,
                                              targetMobAppKey
                                          }: Props) => {

    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [projectId, setProjectId] = useState<string>('');
    const [privateKey, setPrivateKey] = useState<string>('');
    const [clientEmail, setClientEmail] = useState<string>('');

    const handleSave = async () => {
        if (!targetMobAppKey) {
            return
        }
        await onSave({
            app_key: targetMobAppKey,
            client_email: clientEmail,
            private_key: privateKey,
            project_id: projectId,
        })
    }

    useLayoutEffect(() => {
        const init = async () => {
            if (!targetMobAppKey) {
                return
            }
            try {
                setIsLoading(true)
                const res = await getMobAppNotificationSettingsByAppKey({
                    app_key: targetMobAppKey
                })
                if (!res?.row) {
                    setIsLoading(false)
                    setProjectId('')
                    setPrivateKey('')
                    setClientEmail('')
                    return
                }
                setIsLoading(false)
                setProjectId(res.row.project_id)
                setPrivateKey(res.row.private_key)
                setClientEmail(res.row.client_email)

            } catch (error) {
                setIsLoading(false)
                setProjectId('')
                setPrivateKey('')
                setClientEmail('')
            }

        }
        init()
    }, [targetMobAppKey])

    return (
        <Stack
            alignItems={'flex-start'}
            gap={3}
            sx={{
                minHeight: '100%',
            }}
            justifyContent={'center'}
        >
            {isLoading && <Spinner variant={'overlay'} />}

            Налаштування сповіщень : {targetMobAppKey}
            <TextField
                size={'small'}
                fullWidth
                value={projectId}
                onChange={(event) => setProjectId(event.target.value)}
                label={'Project id'}
            />

            <TextField
                size={'small'}
                fullWidth
                value={privateKey}
                onChange={(event) => setPrivateKey(event.target.value)}
                label={'Private Key'}
                rows={7}
                multiline
            />

            <TextField
                size={'small'}
                fullWidth
                value={clientEmail}
                onChange={(event) => setClientEmail(event.target.value)}
                label={'Client email'}
            />

            <Button
                onClick={handleSave}
                variant={'contained'}
            >
                Зберегти
            </Button>
        </Stack>
    );
};

export default MutateMobAppNotificationSettings;