import React from 'react';
import ListItem from "@mui/material/ListItem";
import {sx} from "@views/navigation/sx";
import {Link, useLocation} from "react-router-dom";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import {NavigateItem} from "@views/navigation/types";

interface Props {
    onClickNavigateItem?: (navigate: NavigateItem) => void,
    item: NavigateItem
}

const NavigationItem = ({onClickNavigateItem, item}: Props) => {

    const {pathname, hash} = useLocation();

    const activePath = pathname === item.path;
    return (
        <ListItem
            disablePadding
            sx={sx.item}
        >
            <Link
                to={item.path}
                onClick={onClickNavigateItem ? () => onClickNavigateItem(item) : undefined}
            >
                <ListItemButton
                    selected={activePath}
                >
                    {item.icon && <ListItemIcon>{item.icon}</ListItemIcon>}
                    <ListItemText primary={item.text}/>

                </ListItemButton>
            </Link>
        </ListItem>
    );
};

export default NavigationItem;
