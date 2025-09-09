import {SxStyle} from "@baseTypes/sx";
import {drawerClasses} from "@mui/material/Drawer";

export const sx:SxStyle = {
    drawer:{
        zIndex: (theme) => theme.zIndex.drawer + 1,
        [`& .${drawerClasses.paper}`]: {
            backgroundImage: 'none',
            backgroundColor: 'background.paper',
        },
    },
    root:{
        maxWith: '70dvw',
        height: '100%',
    }
}
