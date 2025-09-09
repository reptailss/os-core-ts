import React, {useMemo} from 'react';
import Stack from "@mui/material/Stack";
import {sx} from './sx'
import CustomInfo from '@containers/customInfo/CustomInfo';
import {useParams} from 'react-router-dom';
import NotFoundMessage from '@ui/notFoundMesssage/NotFoundMessage';
import {useGetCustomPages} from "@containers/customPages/hooks/useGetCustomPages";


const DashboardServiceCustomPage = () => {

    const {pagePath} = useParams();
    const {customPages} = useGetCustomPages()

    const currentCustomPage = useMemo(() => {
        return customPages?.find((item) => item.pagePath === pagePath)
    }, [customPages, pagePath])

    if (!currentCustomPage) {
        return <NotFoundMessage/>
    }
    return (
        <Stack
            sx={sx.root}
        >
            <CustomInfo
                endpointPath={currentCustomPage?.endpointPath}
            />
        </Stack>
    );
};

export default DashboardServiceCustomPage;
