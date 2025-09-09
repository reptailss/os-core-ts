export const sx = {
    tabHeader: {
        textTransform: 'initial'
    },
    inner: {
        borderBottom: 1, borderColor: 'divider'
    },
    header: {
        '& .MuiTabs-flexContainer': {
            overflowX: 'auto',
            maxWidth: '100%',
        }
    },
    content: {
        overflowX: 'hidden',
        flex:1,
    },
    root:{
        display:'flex',
        flexDirection:'column',
        height:'100%'
    }
}
