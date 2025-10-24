import {SxStyles} from '@sx'

export default {
    container: {
        display: 'grid',
        gridTemplateAreas: {
            xs: '"header"\n          "content"',
            lg: '"header header"\n        "sidebar content"',
        },
        gridTemplateRows: 'auto 1fr',
        gridTemplateColumns: {
            xs: '1fr',
            lg: '340px 1fr',
        },
        height: '100vh',
        backgroundColor: '#1f1f22',
        '.lightTheme &':{
            backgroundColor: '#F9FAFB',
        }
    },
    header: {
        gridArea: 'header',
        height: '50px',
    },
    sidebar: {
        gridArea: 'sidebar',
        overflowY: 'auto',
        maxHeight: '100%',
        display: {
            xs:'none',
            lg:'block'
        },
    },
    content: {
        gridArea: 'content',
        overflowY: 'auto',
    },
} as const satisfies SxStyles