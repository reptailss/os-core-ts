import { SxStyle } from "@baseTypes/sx";
import { WIDTH_SIDEBAR_DESKTOP } from "@views/constants/size";

export const sx: SxStyle = {
    container: {
        backgroundColor: 'rgba(6,7,11,255)',
        display: "grid",
        gridTemplateAreas: {
            xs: '"header"\n          "content"',
            lg: '"sidebar header"\n        "sidebar content"'
        },
        gridTemplateRows: {
            xs: 'auto 1fr',
            lg: 'auto 1fr'
        },
        gridTemplateColumns: {
            xs: '1fr',
            lg: `${WIDTH_SIDEBAR_DESKTOP} 1fr`
        },
        height: "100vh",
        paddingTop:{
            xs:'65px',
            lg:'0'
        }
    },
    header: {
        gridArea: "header",
        height: {
            xs: '50px',
            xl: '50px'
        },
    },
    sidebar: {
        gridArea: "sidebar",
        overflowY: 'auto',
        height: '100vh',
        position: 'sticky',
        top: 0,
        borderRight: '1px solid hsla(220, 20%, 25%, 0.6)',
        backgroundColor:'hsl(220, 30%, 7%)',
    },
    content: {
        gridArea: "content",
        overflowY: 'auto',
    }
};
