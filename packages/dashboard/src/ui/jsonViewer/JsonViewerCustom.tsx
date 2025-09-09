import React from 'react';
import JsonView from 'react18-json-view'
import 'react18-json-view/src/style.css'
import 'react18-json-view/src/dark.css'
import Typography from "@mui/material/Typography";

interface IProps {
    data: object,
    name?: string
}

const JsonViewerCustom = ({data, name}: IProps) => {
    return (
        <>
            {name && <Typography>
                {name}
            </Typography>}

            <JsonView
                theme={'a11y'}
                src={data}
            />
        </>
    );
};

export default JsonViewerCustom;
