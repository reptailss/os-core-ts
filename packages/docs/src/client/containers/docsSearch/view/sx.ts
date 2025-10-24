import {SxStyles} from '@sx'

export default {
    searchBtn: {
        display: 'flex',
        alignItems: 'center',
        backgroundColor: '#1c1c1c',
        borderRadius: '8px',
        padding: '6px 12px',
        width: {
            xs: '150px',
            lg: '300px',
        },
        border: '1px solid #2a2a2a',
        cursor: 'pointer',
        color: '#ffffff',
        flex: 1,
        fontSize: '0.9rem',
    },
    searchBtnIcon: {
        fill: '#0894e2', marginRight: '8px',
    },
    modalRoot: {
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
        justifyContent: {
            xs: 'flex-end',
            lg: 'center',
        },
        paddingBottom: '10px',
        alignItems: 'center',
    },
    modalContent: {
        width: {
            xs: '96vw',
            lg: 700,
        },
        backgroundColor: '#121212',
        borderRadius: '8px',
        boxShadow: 24,
        padding: '20px',
        color: '#ffffff',
    },
    modalCloseBtn: {
        position: 'absolute',
        right: '10px',
        top: '10px',
    },
    modalCloseBtnIcon: {
        color: '#ffffff',
    },
    searchContentSearchIcon: {
        color: '#0894e2',
    },
    searchContentInner: {
        width: '100%',
    },
    searchResultsListRoot: {
        marginTop: '8px',
        maxHeight: '70vh',
        overflow: 'auto',
        padding: '0 20px 0 0px',
    },
    searchResultsListTitle: {
        color: '#888888',
        marginLeft: '8px',
        fontWeight: 'bold',
    },
    searchResultItemRoot: {
        backgroundColor: '#2a2a2a',
        borderRadius: '8px',
        margin: '15px 0 5px 0',
        padding: '8px',
        border: '1px solid rgba(232, 234, 238, 0.5)',
        transition: 'all .3s',
        '&:hover': {
            cursor: 'pointer',
            backgroundColor: 'rgba(0, 97, 194, 0.6)',
            borderColor: 'rgba(29, 33, 38, 0.8)',
        },
    },
    searchResultItemMenu: {
        color: '#888888', marginRight: '12px',
    },
    searchResultItemTitle: {
        fontWeight: 'bold',
    },
    searchResultItemSubTitle: {
        color: '#aaaaaa', fontSize: '0.8rem',
    },
    searchResultItemIcon: {
        color: '#888888',
    },
    searchResultContentSearchListDivider: {
        paddingTop: '10px',
    },
    searchResultContentItemSvg:{
        stroke: 'hsl(210, 14%, 56%)',
        height: '52px',
        width: '24px',
        opacity: '.5',
        transition: 'all .3s'
    },
    searchResultContentItemRoot: {
        backgroundColor: '#2a2a2a',
        borderRadius: '8px',
        margin: '4px',
        padding: '8px',
        '&:hover': {
            cursor: 'pointer',
            backgroundColor: 'rgba(0, 97, 194, 0.6)',
            borderColor: 'rgba(29, 33, 38, 0.8)',
            '& .searchIconSvg': {
                opacity: '1',
                stroke: 'hsl(210, 100%, 70%)',
            },
            '& .searchIconSvgHash': {
                opacity: '1',
                fill: 'hsl(210, 100%, 70%)',
            },
            '& .searchTitle': {
                color: 'hsl(210, 100%, 70%)',
            },
        },
    },
    searchResultContentItemMenu: {
        color: '#888888',
        marginRight: '12px',
    },
    searchResultContentItemTitle: {
        fontSize: '13px',
        fontWeight: 'bold',
        paddingLeft: '10px',
        transition: 'all .3s',
        '& .navMatch': {
            color: 'hsl(210, 100%, 70%)'
        }
    },
    searchResultContentItemSubTitle: {
        color: '#aaaaaa',
        fontSize: '0.8rem',
        paddingLeft: '10px',
    },
    searchResultContentItemIcon: {
        color: 'hsl(210, 14%, 56%)'
    },
   
} as const satisfies SxStyles