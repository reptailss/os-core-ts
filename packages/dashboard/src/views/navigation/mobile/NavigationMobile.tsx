import React from 'react';
import Drawer from "@mui/material/Drawer";
import Stack from "@mui/material/Stack";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import Button from "@mui/material/Button";
import LogoutRoundedIcon from "@mui/icons-material/LogoutRounded";
import {sx} from './sx'
import Navigation from "@views/navigation/Navigation";
import RefetchRequests from "@containers/requests/refetchRequests/RefetchRequests";
import {useAuthContext} from "@containers/auth/context/hooks/useAuthContext";
import {useLogOut} from "@containers/auth/hooks/useLogOut";

interface Props {
    open: boolean;
    toggleDrawer: () => void;
}


const NavigationMobile = ({open, toggleDrawer}: Props) => {

    const {user} = useAuthContext()

    const {logOut} = useLogOut()

    return (
        <Drawer
            anchor="right"
            open={open}
            onClose={toggleDrawer}
            sx={sx.drawer}
        >
            <Stack
                sx={sx.root}
            >
                <Stack
                    direction="row"
                    sx={{p: 2, pb: 0, gap: 1}}>

                    <Stack
                        direction="row"
                        sx={{gap: 1, alignItems: 'center', flexGrow: 1, p: 1}}
                    >
                        <Avatar
                            sizes="small"
                            alt={user.name}
                            src={user.picture}
                            sx={{width: 24, height: 24}}
                        />

                        <Typography component="p" variant="h6">
                            {user.name}
                        </Typography>
                    </Stack>
                </Stack>

                <Divider/>


                <Stack
                    sx={{flexGrow: 1}}
                >
                    {/*<RefetchRequests/>*/}

                    <Navigation
                        onClickNavigateItem={toggleDrawer}
                    />

                    <Divider/>
                </Stack>

                <Stack sx={{p: 2}}>
                    <Button
                        variant="outlined"
                        fullWidth
                        startIcon={<LogoutRoundedIcon/>}
                        onClick={logOut}
                    >
                        Logout
                    </Button>
                </Stack>
            </Stack>
        </Drawer>
    );
};

export default NavigationMobile;
