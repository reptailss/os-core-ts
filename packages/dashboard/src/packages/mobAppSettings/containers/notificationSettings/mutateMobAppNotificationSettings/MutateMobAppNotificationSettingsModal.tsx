import React from 'react';
import {IconButton, Modal, Paper} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import {SetStateFn} from "@baseTypes/state";
import {OnSaveMobAppNotificationSettings} from "@packages/mobAppSettings/containers/notificationSettings/types/events";
import MutateMobAppNotificationSettings
    from "@packages/mobAppSettings/containers/notificationSettings/mutateMobAppNotificationSettings/MutateMobAppNotificationSettings";


const sx = {
    root: {
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
        justifyContent: {
            xs: 'flex-end',
            lg: 'center'
        },
        alignItems: 'center',
        paddingBottom: '10px',

    },
    content: {
        width: {
            xs: '96vw',
            lg: '70vw'
        },
        height: '70vh',
        borderRadius: '8px',
        boxShadow: 24,
        color: '#ffffff',
        overflow: 'auto',
        padding: '20px',
    },
    title: {
        m: 0,
        p: 2,
    },
    close: {
        position: 'absolute',
        right: '20px',
        top: '20px'
    }
}

interface Props {
    open: boolean,
    setOpen: SetStateFn<boolean>,
    onSave: OnSaveMobAppNotificationSettings
    targetMobAppKey: string | null
}


const MutateMobAppNotificationSettingsModal = ({
                                                   open,
                                                   setOpen,
                                                   targetMobAppKey,
                                                   onSave
                                               }: Props) => {

    const handleClose = () => setOpen(false)

    return (
        <Modal
            open={open}
            onClose={handleClose}
            sx={sx.root}
        >
            <Paper
                sx={sx.content}
            >
                <IconButton
                    onClick={handleClose}
                    sx={sx.close}
                >
                    <CloseIcon/>
                </IconButton>

                <MutateMobAppNotificationSettings
                    targetMobAppKey={targetMobAppKey}
                    onSave={onSave}
                />
            </Paper>
        </Modal>
    );
};

export default MutateMobAppNotificationSettingsModal;