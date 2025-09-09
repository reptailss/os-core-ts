import React from 'react';
import {SxStyle} from "@baseTypes/sx";
import Box from "@mui/material/Box";

const sx: SxStyle = {
    root: {
        display: "inline-block",
        width: "55px",
        marginLeft: "15px",
        marginRight: "15px",
        color: "#7e7e7e",
        WebkitUserSelect: "none",
        userSelect: "none",
        textAlign: "right",
        minWith: "40px",
        cursor: "pointer",
        textDecoration: "none",
        paddingRight: "1em",
        verticalAlign: "top"
    }
}

const LineNumber = ({lineNumber}: { lineNumber: number }) => {
    return (
        <Box
            component={'span'}
            sx={sx.root}
        >
            {lineNumber}
        </Box>
    );
};

export default LineNumber;
