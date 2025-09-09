import {sx} from './sx'
import {Box, Paper, Stack, Typography} from "@mui/material";

import {FC, ReactNode} from "react";



interface IProps {
    message?: string,
    variant?: 'overlay' | 'default',
    children?: ReactNode,
}

const ErrorBlock: FC<IProps> = ({
                                    message,
                                    variant = 'overlay',
                                    children,
                                }) => {


    if (variant === 'overlay') {
        return (
            <>
                <Box sx={sx.overlay}/>
                <Paper
                    elevation={3}
                    sx={sx.inner}
                    className={'overlay'}
                >
                    {children ? children : <Stack
                        direction={'row'}
                        alignItems={'center'}
                        justifyContent={'center'}
                        gap={1}
                    >
                        <Typography
                            variant={'body2'}
                        >
                            {message || 'щось пішло не так...'}
                        </Typography>
                    </Stack>}
                </Paper>
            </>
        );
    }

    return  (
        <Paper
            elevation={3}
            sx={sx.inner}
        >
            {children ? children : <Stack
                direction={'row'}
                alignItems={'center'}
                justifyContent={'center'}
                gap={1}
            >
                <Typography
                    variant={'body2'}
                >
                    {message || 'щось пішло не так...'}
                </Typography>
            </Stack>}
        </Paper>
    )
};

export default ErrorBlock;