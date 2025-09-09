import React, {ReactElement} from 'react';

import {Box, Modal} from "@mui/material";
import MenuMui from "@mui/material/Menu";
import './styles.css'
import { useMedia } from '@hooks/useMedia';


const sx = {

    desktop: {
        minWith: {
            xs: '214px',
            lg: '505px'
        },
        minHeight: {
            xs: '270px',
            lg: '265px'
        },
        overflow: 'hidden',
        width: '100%'
    },
    mobile:{
        width:'100%',
        padding:'10px',
        height:"100%",
        display:"flex",
        flexDirection:'column',
        alignItems:'center',
        justifyContent:'flex-end'
    }
}

interface IProps {
    children: ReactElement,
    open: boolean,
    onClose: () => void,
    anchorEl: HTMLButtonElement | null,
}

const DatePickerModalWrapper = ({
                                    open,
                                    onClose,
                                    children,
                                    anchorEl,
                                }: IProps) => {
    const {isDesktop} = useMedia()


    if (!isDesktop) {
        return (
            <Modal
                open={open}
                onClose={onClose}
            >
                <Box
                    sx={sx.mobile}
                >
                    {children}
                </Box>
            </Modal>
        )
    }
    return (
        <MenuMui
            open={open}
            onClose={onClose}
            anchorEl={anchorEl}
            PopoverClasses={{
                paper: 'date-picker-portal-paper'
            }}

        >
            <Box
                sx={sx.desktop}
            >
                {children}
            </Box>
        </MenuMui>
    );
};

export default DatePickerModalWrapper;
