import React, {useState} from 'react';
import DatePickerModalWithInput from "@ui/date/datePickerRange/DatePickerModalWithInput";
import DatePickerRange from "@ui/date/datePickerRange/DatePickerRange";
import {DateObject} from "react-multi-date-picker";
import moment from "moment/moment";
import {OnSaveDatePickerRangeCB} from "@ui/date/datePickerRange/types";

interface IProps {
    initialDateStart?: Date
    initialDateEnd?: Date
    onSave: OnSaveDatePickerRangeCB
    inputFormat?: string
    disabled?: boolean
    hasTime?: boolean
    hasShowTimeToggle?: boolean
    onChangeShowTime?: (value: boolean) => void
    initialShowTime?: boolean
    hasSeconds?: boolean
    resetTimeStart?: string
    resetTimeEnd?: string
    hasResetTimeOnChangeHasTime?: boolean
}

const DatePickerRangeSidebar = ({
                                    initialDateStart,
                                    initialDateEnd,
                                    onSave,
                                    disabled,
                                    hasTime,
                                    hasShowTimeToggle,
                                    onChangeShowTime,
                                    initialShowTime,
                                    inputFormat='DD/MM/YYYY',
                                    hasSeconds,
                                    resetTimeStart = '00:00:00',
                                    resetTimeEnd = '23:59:59',
                                    hasResetTimeOnChangeHasTime = true,
                                }: IProps) => {

    const [localDateStart, setLocalDateStart] = useState<Date | null>(initialDateStart || null)
    const [localDateEnd, setLocalDateEnd] = useState<Date | null>(initialDateEnd || null)
    const [showTime, setShowTime] = useState<boolean>(!!initialShowTime)
    const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);

    const [value, setValue] = useState([
        new DateObject({
            date: initialDateStart
        }),
        new DateObject({
            date: initialDateEnd
        }),
    ]);

    const onClose = () => {
        setValue([
            new DateObject(moment(initialDateStart).format()),
            new DateObject(moment(initialDateEnd).format()),
        ])
        setAnchorEl(null);
    }

    const handleSave: OnSaveDatePickerRangeCB = async (data: {
        dateStart: Date,
        dateEnd: Date,
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
        >
            <DatePickerRange
                value={value}
                setValue={setValue}
                onSave={handleSave}
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
