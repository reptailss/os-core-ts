import React from 'react';
import Stack from "@mui/material/Stack";

import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import {sx} from './sx'
import UserOptionsMenu from "./UserOptionsMenu";
import {useRequestsContext} from "@containers/requests/context/hooks/useRequestsContext";
import {useAuthContext} from "@containers/auth/context/hooks/useAuthContext";
import {useLogOut} from "@containers/auth/hooks/useLogOut";

const UserBar = () => {

    const{user} = useAuthContext()

    return (
        <Stack
            direction="row"
            sx={sx.root}
        >
            <Avatar
                sizes="small"
                alt={user.name}
                src={user.picture}
                sx={{width: 36, height: 36}}
            />
            <Box sx={{mr: 'auto'}}>
                <Typography variant="body2" sx={{fontWeight: 500, lineHeight: '16px'}}>
                    {user.name}
                </Typography>
                <Typography variant="caption" sx={{color: 'text.secondary'}}>
                    {user.email}
                </Typography>
            </Box>
            <UserOptionsMenu/>
        </Stack>
    );
};

export default UserBar;
