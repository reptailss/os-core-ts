import { SxStyle } from "@baseTypes/sx";

export const sx:SxStyle = {
    root:{
        width: '48px',
        height: '48px',
        position: 'fixed',
        transform:'translate(-50%,-50%)',
        left: '50%',
        top: '50%'
    },
    overlay:{
        width:'100vw',
        height:'100vh',
        position: 'fixed',
        left:'0',
        top:'0',
        bottom:"0",
        right:'0',
        backgroundColor:'rgba(0,0,0,.4)'
    }
}
