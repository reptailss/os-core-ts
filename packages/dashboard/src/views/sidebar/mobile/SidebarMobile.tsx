import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Stack from '@mui/material/Stack';
import IconButton from '@mui/material/IconButton';
import MenuRoundedIcon from '@mui/icons-material/MenuRounded';

import {sx} from './sx'
import {Toolbar} from './Toolbar'
import Logo from "@views/logo/Logo";
import NavigationMobile from "@views/navigation/mobile/NavigationMobile";
import RefetchRequests from "@containers/requests/refetchRequests/RefetchRequests";


const SidebarMobile = () => {

    const [open, setOpen] = React.useState<boolean>(false);

    const toggleDrawer = () => {
        setOpen((prev) => !prev)
    };

    return (
        <AppBar
            position="fixed"
            sx={sx.appBar}
        >
            <Toolbar
                variant="regular"
            >
                <Stack
                    direction="row"
                    sx={sx.inner}
                >
                    <Stack
                        direction="row"
                        spacing={1}
                        sx={sx.wrap}
                    >
                        <Logo/>
                    </Stack>

                    <IconButton
                        onClick={toggleDrawer}
                    >
                        <MenuRoundedIcon/>
                    </IconButton>

                    <NavigationMobile
                        open={open}
                        toggleDrawer={toggleDrawer}
                    />
                </Stack>
            </Toolbar>
        </AppBar>
    );
}

export default SidebarMobile
