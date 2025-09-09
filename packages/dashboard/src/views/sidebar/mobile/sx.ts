import {SxStyle} from "@baseTypes/sx";

export const sx:SxStyle = {
    appBar:{
        display: { xs: 'auto', md: 'none' },
        boxShadow: 0,
        bgcolor: 'background.paper',
        backgroundImage: 'none',
        borderBottom: '1px solid',
        borderColor: 'divider',
        top: 'var(--template-frame-height, 0px)',
    },
    inner:{
        alignItems: 'center',
        flexGrow: 1,
        width: '100%',
        gap: 1,
    },
    wrap:{
        justifyContent: 'center', mr: 'auto'
    }
}
