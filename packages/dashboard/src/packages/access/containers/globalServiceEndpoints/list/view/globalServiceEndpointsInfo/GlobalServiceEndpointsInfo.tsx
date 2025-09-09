import React from 'react';
import {SetStateFn} from "@baseTypes/state";
import {IconButton, Modal, Paper} from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';
import JsonViewerCustom from "@ui/jsonViewer/JsonViewerCustom";
import {GlobalServiceEndpoints} from "@packages/access/containers/globalServiceEndpoints/types";

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
    targetGlobalServiceEndpoints: GlobalServiceEndpoints | null
}

const GlobalServiceEndpointsInfo = ({targetGlobalServiceEndpoints, open, setOpen}: Props) => {

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
                <JsonViewerCustom data={targetGlobalServiceEndpoints || {}}/>

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

export default GlobalServiceEndpointsInfo;
