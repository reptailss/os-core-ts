import {SxStyle} from "@baseTypes/sx";

export const sx: SxStyle = {
    rootModal: {
        width: '100%',
        height:'100%',
    },
    closeModal: {
        position: 'absolute',
        right: '20px',
        top: '20px',
        zIndex: '55',
    },
    contentModal:{
        height:'100vh',
    },
    root:{
        padding: '10px 15px',
        height:'100%'
    },
    sidebar:{
        height:'100%',
        position: 'relative',
        paddingTop:'50px',
        overflowY:'auto',
        padding:'10px 10px 10px 10px'
    },
    sidebarBtn:{
        position: 'sticky',
        bottom: '10px',
        marginTop:'10px',
        '&.disableStickyBtn':{
            position: 'relative',
            bottom: 'initial',
        }
    }
}
