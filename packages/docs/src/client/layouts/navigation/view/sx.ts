import {SxStyles} from '@sx'

export default {
    root: {
        backgroundColor: 'transparent',
        backgroundImage: 'none',
        boxShadow: 'none',
        padding:'3px 10px 3px 0',
        margin:'0',
        '& .MuiAccordionSummary-content':{
            margin:'0!important'
        },
        '.lightTheme & .MuiAccordionSummary-content':{
            color: '#E0F2FE',
        },
        '& .MuiAccordionDetails-root':{
            padding:'0 0 0 10px'
        },
        '& .MuiButtonBase-root':{
            minHeight:'auto!important'
        },
    },
    summary:{
        '&.Mui-expanded':{
            borderBottom:'1px solid rgba(255,255,255,.1)',
        },
        '.lightTheme & .MuiAccordionSummary-expandIconWrapper':{
            color: '#E0F2FE',
        }
        
    },
    link: {
        padding: '3px 10px 3px 4px',
        cursor: 'pointer',
        transition: 'all .3s',
        textDecoration: 'none',
        border: 'none',
        color: '#dfdfe3',
        display: 'inline-block',
        '.lightTheme &':{
            color: '#E0F2FE',
        },
        '&:hover': {
            opacity: '.5'
        },
        '.active-link&': {
            color: '#f1455f'
        },
        '.active-link.lightTheme&': {
            color: '#D1D5DB'
        },
        '.anchor-link&': {
            padding: '3px 4px 3px 0',
        },
        '.has-padding&':{
            padding: '8px 4px 6px 20px',
        },
        '.has-border&':{
            borderTop:'1px solid rgba(255, 255, 255, 0.12)'
        }
    },
    content:{
        '& .MuiAccordionSummary-root.MuiButtonBase-root ':{
            paddingLeft:'0!important',
            paddingRight:'0!important',
            marginLeft:'0!important'
        },
        margin:'0',
        '& .uiAccordionSummary-content':{
            margin:'0',
            
        },
    },
    children:{
        paddingLeft:"17px"
    }
} as const satisfies SxStyles