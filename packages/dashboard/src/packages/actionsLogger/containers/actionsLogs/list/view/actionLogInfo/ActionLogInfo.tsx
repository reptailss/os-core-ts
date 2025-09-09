import React from 'react';
import {SetStateFn} from "@baseTypes/state";
import {IconButton, Modal, Paper} from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';
import JsonViewerCustom from "@ui/jsonViewer/JsonViewerCustom";
import {ActionLog} from "@packages/actionsLogger/containers/actionsLogs/types";
import TabsCustom from "@ui/tabs/TabsCustom";
import {CustomTabItem} from "@ui/tabs/types";
import ActionLogInfoChanges
    from "@packages/actionsLogger/containers/actionsLogs/list/view/actionLogInfo/ActionLogInfoChanges";

const sx = {
    root: {
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
        justifyContent: {
            xs: 'flex-end',
            lg: 'center'
        },
        paddingBottom: '10px',
        alignItems: 'center',

    },
    content: {
        width: {
            xs: '96vw',
            lg: '90vw'
        },
        maxHeight: '94vh',
        borderRadius: '8px',
        boxShadow: 24,
        color: '#ffffff',
        overflow: 'auto'
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
    targetActionLog: ActionLog | null
}

const ActionLogInfo = ({targetActionLog, open, setOpen}: Props) => {

    const handleClose = () => setOpen(false)

    const tabs: CustomTabItem[] = [
        {
            component: <JsonViewerCustom data={targetActionLog || {}}/>,
            label: 'JSON'
        },
        {
            component: <ActionLogInfoChanges targetActionLog={targetActionLog}/>,
            label: 'Зміни'
        }
    ]

    return (
        <Modal
            open={open}
            onClose={handleClose}
            sx={sx.root}
        >
            <Paper
                sx={sx.content}
            >
                <TabsCustom tabs={tabs}/>

                <IconButton
                    onClick={handleClose}
                    sx={sx.close}
                >
                    <CloseIcon/>
                </IconButton>


            </Paper>
        </Modal>
    );
};

export default ActionLogInfo;
