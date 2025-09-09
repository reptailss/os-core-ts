import React from 'react';
import {IconButton, Modal, Paper} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import MutateImageGeneratorType
    from "@packages/imageGenerator/containers/imageGeneratorTypes/mutateImageGeneratorType/MutateImageGeneratorType";
import {SetStateFn} from "@baseTypes/state";
import {OnSaveImageGenerationType} from "@packages/imageGenerator/containers/imageGeneratorTypes/types/events";
import {ImageGeneratorType} from "@packages/imageGenerator/containers/imageGeneratorTypes/types";


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
            lg: '60vw'
        },
        height: '80vh',
        borderRadius: '8px',
        boxShadow: 24,
        color: '#ffffff',
        overflow: 'auto',
        padding:'20px'
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
    onSave: OnSaveImageGenerationType
    targetImageGeneratorType: ImageGeneratorType | null
}

const MutateImageGeneratorTypeModal = ({
                                           open,
                                           setOpen,
                                           targetImageGeneratorType,
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

                <MutateImageGeneratorType
                    initial={targetImageGeneratorType}
                    onSave={onSave}
                />
            </Paper>
        </Modal>
    );
};

export default MutateImageGeneratorTypeModal;