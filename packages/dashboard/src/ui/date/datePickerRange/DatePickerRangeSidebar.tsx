import React, {useState} from 'react';
import DatePickerModalWithInput from "@ui/date/datePickerRange/DatePickerModalWithInput";
import DatePickerRange from "@ui/date/datePickerRange/DatePickerRange";
import {DateObject} from "react-multi-date-picker";
import moment from "moment/moment";
import {OnSaveDatePickerRangeCB} from "@ui/date/datePickerRange/types";

interface IProps {
    initialDateStart?: string,
    initialDateEnd?: string,
    onSave: OnSaveDatePickerRangeCB,
    format?: string,
    disabled?: boolean,
    hasTime?: boolean,
    hasShowTimeToggle?: boolean,
    onChangeShowTime?: (value: boolean) => void,
    initialShowTime?: boolean,
    hasSeconds?: boolean,
    inputFormat?: string,
    resetTimeStart?: string,
    resetTimeEnd?: string,
    hasResetTimeOnChangeHasTime?: boolean
}

const DatePickerRangeSidebar = ({
                                    initialDateStart,
                                    initialDateEnd,
                                    onSave,
                                    format = 'DD/MM/YYYY',
                                    disabled,
                                    hasTime,
                                    hasShowTimeToggle,
                                    onChangeShowTime,
                                    initialShowTime,
                                    inputFormat,
                                    hasSeconds,
                                    resetTimeStart = '00:00:00',
                                    resetTimeEnd = '23:59:59',
                                    hasResetTimeOnChangeHasTime = true,
                                }: IProps) => {

    const [localDateStart, setLocalDateStart] = useState<string>(initialDateStart || '')
    const [localDateEnd, setLocalDateEnd] = useState<string>(initialDateEnd || '')
    const [showTime, setShowTime] = useState<boolean>(!!initialShowTime)
    const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);

    const [value, setValue] = useState([
        new DateObject({
            format,
            date: initialDateStart
        }),
        new DateObject({
            format,
            date: initialDateEnd
        }),
    ]);

    const onClose = () => {
        setValue([
            new DateObject(moment(initialDateStart, format).format()),
            new DateObject(moment(initialDateEnd, format).format()),
        ])
        setAnchorEl(null);
    }

    const handleSave: OnSaveDatePickerRangeCB = async (data: {
        dateStart: string,
        dateEnd: string,
        showTime: boolean
    }) => {
        setAnchorEl(null);
        setShowTime(data?.showTime)
        setLocalDateStart(data?.dateStart)
        setLocalDateEnd(data?.dateEnd)
        await onSave(data)
    }


    return (
        <DatePickerModalWithInput
            anchorEl={anchorEl}
            setAnchorEl={setAnchorEl}
            dateStart={localDateStart}
            dateEnd={localDateEnd}
            disabled={disabled}
            inputFormat={inputFormat}
            format={format}
        >
            <DatePickerRange
                value={value}
                setValue={setValue}
                onSave={handleSave}
                format={format}
                onClose={onClose}
                hasTime={hasTime}
                hasShowTimeToggle={hasShowTimeToggle}
                onChangeShowTime={onChangeShowTime}
                initialShowTime={showTime}
                hasSeconds={hasSeconds}
                resetTimeStart={resetTimeStart}
                resetTimeEnd={resetTimeEnd}
                hasResetTimeOnChangeHasTime={hasResetTimeOnChangeHasTime}
            />
        </DatePickerModalWithInput>
    );
};

export default DatePickerRangeSidebar;
