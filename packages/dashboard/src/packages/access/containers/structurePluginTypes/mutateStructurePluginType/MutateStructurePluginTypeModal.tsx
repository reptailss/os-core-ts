import React from 'react';
import {IconButton, Modal, Paper} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import {SetStateFn} from "@baseTypes/state";
import MutateStructurePluginType
    from "@packages/access/containers/structurePluginTypes/mutateStructurePluginType/MutateStructurePluginType";
import {OnSaveStructurePluginType} from "@packages/access/containers/structurePluginTypes/types/events";
import {StructurePluginType} from "@packages/access/containers/structurePluginTypes/types";


const sx = {
    root: {
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
        justifyContent: {
            xs: 'flex-end',
            lg: 'center'
        },
        alignItems:'center',
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
    onSave: OnSaveStructurePluginType
    targetStructurePluginType?: StructurePluginType | null
}


const MutateStructurePluginTypeModal = ({
                                            open,
                                            setOpen,
                                            targetStructurePluginType,
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

                <MutateStructurePluginType
                    initial={targetStructurePluginType}
                    onSave={onSave}
                />
            </Paper>
        </Modal>
    );
};

export default MutateStructurePluginTypeModal;