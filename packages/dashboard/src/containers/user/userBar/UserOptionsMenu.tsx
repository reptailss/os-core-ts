import * as React from 'react';
import Menu from '@mui/material/Menu';
import MuiMenuItem from '@mui/material/MenuItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemIcon from '@mui/material/ListItemIcon';
import LogoutRoundedIcon from '@mui/icons-material/LogoutRounded';
import MoreVertRoundedIcon from '@mui/icons-material/MoreVertRounded';
import IconButton from "@mui/material/IconButton";
import {useLogOut} from "@containers/auth/hooks/useLogOut";


export default function UserOptionsMenu() {

    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

    const {logOut} = useLogOut()

    const open = Boolean(anchorEl);
    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    const onLogOut = ()=>{
        handleClose()
        logOut()
    }
    return (
        <React.Fragment>
            <IconButton
                aria-label="Open menu"
                onClick={handleClick}
                sx={{borderColor: 'transparent'}}
            >
                <MoreVertRoundedIcon/>
            </IconButton>
            <Menu
                anchorEl={anchorEl}
                id="menu"
                open={open}
                onClose={handleClose}
                transformOrigin={{horizontal: 'right', vertical: 'top'}}
                anchorOrigin={{horizontal: 'right', vertical: 'bottom'}}
            >
                <MuiMenuItem
                    onClick={onLogOut}
                >
                    <ListItemText>
                        Logout
                    </ListItemText>
                    <ListItemIcon>
                        <LogoutRoundedIcon fontSize="small"/>
                    </ListItemIcon>
                </MuiMenuItem>
            </Menu>
        </React.Fragment>
    );
}
