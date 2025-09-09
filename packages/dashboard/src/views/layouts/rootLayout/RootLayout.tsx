import React, {ReactNode} from 'react';
import Box from "@mui/material/Box";
import {sx} from './sx'
import SidebarMobile from "@views/sidebar/mobile/SidebarMobile";
import Sidebar from "@views/sidebar/Sidebar";
import {useMedia} from "@hooks/useMedia";
import Confirm from "@views/confirm/Confirm";
import SnackBar from "@views/snackBar/SnackBar";

interface Props {
    children: ReactNode,
    sidebarChildren?: ReactNode,
}

const RootLayout = ({children, sidebarChildren}: Props) => {

    const {isDesktop} = useMedia()

    return (
        <Box
            sx={sx.container}
        >
            <Confirm/>
            <SnackBar/>
            {isDesktop && <Box
                sx={sx.sidebar}
            >
                <Sidebar>
                    {sidebarChildren}
                </Sidebar>
            </Box>}

            {!isDesktop && <SidebarMobile/>}

            <Box
                sx={sx.content}
            >
                {children}
            </Box>
        </Box>
    )
};

export default RootLayout;
