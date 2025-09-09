import React, {ReactNode} from 'react';
import Navigation from "@views/navigation/Navigation";
import {sx} from './sx'
import UserBar from "../../containers/user/userBar/UserBar";
import Paper from '@mui/material/Paper';
import Logo from '@views/logo/Logo';
import Divider from "@mui/material/Divider";
import Stack from '@mui/material/Stack';
import DashboardIcon from '@mui/icons-material/Dashboard';
import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import ArticleIcon from '@mui/icons-material/Article';
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import {getRootApiUrl} from "@helpers/apiUrl/getRootApiUrl";

interface Props {
    children: ReactNode
}

const Sidebar = ({children}: Props) => {
    return (
        <Paper
            sx={sx.root}
        >
            <Stack
                sx={sx.logo}
                direction={'row'}
                alignItems={'center'}
                justifyContent={'space-between'}
            >
                <Logo/>

                <DashboardIcon/>

            </Stack>

            <Divider/>

            <Link
                href={`${getRootApiUrl()}swagger`}
                target={'_blank'}
            >
                <ListItemButton>
                    <ListItemIcon>
                        <ArticleIcon/>
                    </ListItemIcon>

                    <ListItemText
                        primary={'Swagger'}
                    />
                </ListItemButton>
            </Link>

            <Divider/>

            <Box
                sx={sx.inner}
            >
                <Navigation/>

                {children && children}
            </Box>

            <UserBar/>
        </Paper>
    );
};

export default Sidebar;
