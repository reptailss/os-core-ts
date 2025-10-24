import React, {ReactElement} from 'react';
import {Typography} from "@mui/material";
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';


import Paper from "@mui/material/Paper";
import moment from 'moment';
import DatePickerModalWrapper from "@ui/date/datePickerRange/DatePickerModalWrapper";
import {SetStateFn} from "@baseTypes/state";
import { classNames } from '@helpers/classNames';

const sx = {
    button: {
        borderRadius: '7px',
        padding: '7px 14px',
        border: '1px solid gray',
        display: 'flex',
        alignItems: 'center',
        gap: '10px',
        transition: 'all .3s',
        cursor: 'pointer',
        '&.disabled': {
            opacity: '.5',
            pointerEvents: 'none'
        }
    },
}

interface IProps {
    children: ReactElement,
    onClose?: () => void,
    refFeatures?: any,
    dateStart: Date | null,
    dateEnd: Date | null,
    anchorEl: HTMLButtonElement | null,
    setAnchorEl: SetStateFn<HTMLButtonElement | null>,
    disabled?: boolean,
    inputFormat?: string
    format?: string,
}

const DatePickerModalWithInput = ({
                                       onClose,
                                       children,
                                       anchorEl,
                                       setAnchorEl,
                                       dateEnd,
                                       dateStart,
                                       disabled,
                                       inputFormat,
                                   }: IProps) => {


    const open = Boolean(anchorEl);

    const handleClick = (event: any) => {
        if (disabled) {
            return
        }
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
        onClose && onClose()
    };

    const currentDateStart = dateStart ?  inputFormat ? moment(dateStart).format(inputFormat) : dateStart : '';
    const currentDateEnd = dateEnd ? inputFormat ? moment(dateEnd).format(inputFormat) : dateEnd : '';

    return (
        <>

            <Paper
                onClick={handleClick}
                sx={sx.button}
                className={classNames(disabled && 'disabled')}
            >
                <Typography>
                    {`${currentDateStart} - ${currentDateEnd}`}
                </Typography>

                <CalendarMonthIcon/>
            </Paper>

            {open && <DatePickerModalWrapper
                open={open}
                onClose={handleClose}
                anchorEl={anchorEl}
            >
                {children}
            </DatePickerModalWrapper>}
        </>

    );
};

export default DatePickerModalWithInput;
