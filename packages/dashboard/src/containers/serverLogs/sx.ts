import {SxStyle} from "@baseTypes/sx";

export const sx:SxStyle = {
    root:{
        backgroundColor:'#222',
        padding:{
            xs:'70px 10px 10px',
            lg:'30px 20px'
        },
        display:'flex',
        flexDirection:'column',
        alignItems:'flex-start',
        gap:'5px',
        overflowX:'auto',
        maxHeight:{
            lg:'calc(100vh - 20px)',
            xs:'100vh'
        },
        minHeight:{
            lg:'calc(100vh - 20px)',
            xs:'100vh'
        },
        position:"relative",
    },
    refetch:{
        position:{
            lg:'sticky'
        },
        top:{
            lg:'0'
        },
        left:{
            lg:'0'
        },
    },
    pagination:{
        position:'sticky',
        bottom:'0',
        left:'0',
        backgroundColor:'#222',
    },
    input:{
        width:{
            xs:'100%',
            lg:'300px'
        },
        maxWith:{
            lg:'300px'
        },
        backgroundColor:'#222',
        position:{
            lg:'fixed'
        },
        left:'auto',
        top:{
            lg:'35px'
        },
        right:{
            lg:'30px'
        },
    },
}
