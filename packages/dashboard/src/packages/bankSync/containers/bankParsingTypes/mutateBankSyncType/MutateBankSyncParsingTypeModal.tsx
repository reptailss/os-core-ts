import React from 'react';
import {IconButton, Modal, Paper} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import {SetStateFn} from "@baseTypes/state";
import {OnSaveBankSyncParsingType} from "@packages/bankSync/containers/bankParsingTypes/types/events";
import {BankSyncParsingType} from "@packages/bankSync/containers/bankParsingTypes/types";
import MutateBankSyncParsingType
    from "@packages/bankSync/containers/bankParsingTypes/mutateBankSyncType/MutateBankSyncParsingType";


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
        padding: '20px'
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
    onSave: OnSaveBankSyncParsingType
    targetBankSyncParsingType: BankSyncParsingType | null
}

const MutateBankSyncParsingTypeModal = ({
                                            open,
                                            setOpen,
                                            targetBankSyncParsingType,
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

                <MutateBankSyncParsingType
                    initial={targetBankSyncParsingType}
                    onSave={onSave}
                />
            </Paper>
        </Modal>
    );
};

export default MutateBankSyncParsingTypeModal;