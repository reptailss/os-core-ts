import React, {ReactNode} from 'react'
import Modal from '@mui/material/Modal'
import Box from '@mui/material/Box'
import sx from './sx'
import {IconButton} from '@mui/material'
import CloseIcon from '@mui/icons-material/Close'



const SearchModalView = ({
                             open,
                             onClose,
                             children,
                         }: {
    open: boolean,
    onClose: () => void
    children: ReactNode
}) => {
    
    
    return (
        <Modal
            open={open}
            onClose={onClose}
        >
            <Box
                sx={sx.modalRoot}
            >
                <Box
                    sx={sx.modalContent}
                >
                    <IconButton
                        onClick={onClose}
                        sx={sx.modalCloseBtn}
                    >
                        <CloseIcon
                            sx={sx.modalCloseBtnIcon}
                        />
                    </IconButton>
                    
                    {children}
                </Box>
            </Box>
        </Modal>
    )
}

export default SearchModalView
