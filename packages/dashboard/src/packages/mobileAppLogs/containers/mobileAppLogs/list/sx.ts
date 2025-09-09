import {SxStyle} from "@baseTypes/sx";

export const sx: SxStyle = {
    table: {maxHeight: 'calc(100vh - 85px)'},
    container:{
      height:'100%',
        position:'relative'
    },
    sidebar: {
        paddingTop:'30px',
        paddingBottom:'10px',
        maxHeight: 'calc(100vh - 85px)'
    },
    btn:{
        position: 'absolute',
        top: '0',
        left: '0',
        zIndex:55
    }
}