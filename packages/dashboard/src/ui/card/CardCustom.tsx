import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import {ReactNode} from "react";


const COLORS = {
    green: "#388e3c",
    red: "#d32f2f",
    gray: "#616161"
}


const LABEL_COLORS = {
    green: 'success' as const,
    red: 'error' as const,
    gray: 'default' as const,
}


interface Props {
    title?: string | number
    subtitle?: string | number
    description?: string | number;
    chipColor?: 'green' | 'red' | 'gray',
    chip?: string | number,
    children?:ReactNode
}

export default function CardCustom({
                                       title,
                                       subtitle,
                                       description,
                                       chip,
                                       chipColor,
                                       children,
                                   }: Props) {


    const colorChip = LABEL_COLORS[chipColor || 'green'];


    return (
        <Card
            variant="outlined"
            sx={{height: '100%', flexGrow: 1}}
        >
            <CardContent>
                {title && <Typography
                    component="h2"
                    variant="subtitle2" gutterBottom
                >
                    {title}
                </Typography>}
                <Stack
                    direction="column"
                    sx={{justifyContent: 'space-between', flexGrow: '1', gap: 1}}
                >
                    <Stack sx={{justifyContent: 'space-between'}}>
                        <Stack
                            direction="row"
                            sx={{justifyContent: 'space-between', alignItems: 'center'}}
                        >
                            {subtitle && <Typography variant="h4" component="p">
                                {subtitle}
                            </Typography>}
                            {chip && <Chip size="small" color={colorChip} label={chip}/>}
                        </Stack>
                        {description && <Typography variant="caption" sx={{color: 'text.secondary'}}>
                            {description}
                        </Typography>}
                    </Stack>
                </Stack>

                {children && children}
            </CardContent>
        </Card>
    );
}
