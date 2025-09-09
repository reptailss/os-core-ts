import React, {useState} from "react";
import {Calendar, DateObject} from "react-multi-date-picker";
import OnSaveDatePickerRange from "@ui/date/datePickerRange/OnSaveDatePickerRange";
import './styles.css'


import {WEEK_DAYS_DATE_PICKER_RANGE} from "./constants/weekDays";
import {MONTH_DATE_PICKER_RANGE} from "@ui/date/datePickerRange/constants/month";
import "react-multi-date-picker/styles/backgrounds/bg-dark.css"


import {OnSaveDatePickerRangeCB} from "@ui/date/datePickerRange/types";
import {getInitialLastEndTime} from "@ui/date/datePickerRange/helpers/getInitialLastEndTime";
import {SetStateFn} from "@baseTypes/state";
import {useMedia} from "@hooks/useMedia";
import {classNames} from "@helpers/classNames";

interface IProps {
    value: DateObject[],
    setValue: SetStateFn<DateObject[]>
    onSave: OnSaveDatePickerRangeCB,
    format?: string,
    onClose: () => void,
    hasTime?: boolean,
    hasShowTimeToggle?: boolean,
    onChangeShowTime?: (value: boolean) => void,
    initialShowTime?: boolean,
    hasSeconds?: boolean,
    resetTimeStart?: string,
    resetTimeEnd?: string,
    hasResetTimeOnChangeHasTime?: boolean
}


const DatePickerRange = ({
                             value,
                             setValue,
                             onSave,
                             format = 'DD/MM/YYYY',
                             onClose,
                             hasTime,
                             hasShowTimeToggle,
                             onChangeShowTime,
                             initialShowTime,
                             hasSeconds,
                             resetTimeStart = '00:00:00',
                             resetTimeEnd = '23:59:59',
                             hasResetTimeOnChangeHasTime = true,
                         }: IProps) => {

    const [showTime, setShowTime] = useState(
        typeof initialShowTime !== "undefined" ? initialShowTime : hasTime
    )

    const [lastEndTime, setLastEndTime] = useState<{
        hour: number,
        minutes: number,
        seconds: number,
    }>(() => getInitialLastEndTime({
        value,
        resetTimeEnd,
        hasResetTimeOnChangeHasTime,
    }))
    const {isDesktop} = useMedia()
    const isDark = true

    const handleChange = (value: DateObject[]) => {
        if (!hasTime) {
            setValue(value)
            return
        }
        setValue((prev) => {
            return value?.map((item, index) => {
                const prevValue = prev?.length >= (index + 1) ? prev[index] : null;
                if (!prevValue && hasResetTimeOnChangeHasTime && index === 1) {
                    let newValue = item.setHour(lastEndTime.hour).setMinute(lastEndTime.minutes)
                    if (hasSeconds) {
                        newValue.setSecond(lastEndTime.seconds)
                    }
                    return newValue
                }
                if (prevValue) {
                    const prevHour = prevValue.hour
                    const prevMinutes = prevValue.minute
                    const prevSeconds = prevValue.second
                    let newValue = item.setHour(prevHour).setMinute(prevMinutes)
                    if (hasSeconds) {
                        newValue.setSecond(prevSeconds)
                    }
                    return newValue
                }
                return item
            })

        })
    }


    const plugins = [
        <OnSaveDatePickerRange
            position="bottom"
            onSave={onSave}
            onClose={onClose}
            format={format}
            showTime={showTime}
        />
    ]

    return (
        <Calendar
            value={value}
            onChange={handleChange}
            range
            numberOfMonths={isDesktop ? 2 : 1}
            format={format}
            weekDays={WEEK_DAYS_DATE_PICKER_RANGE}
            months={MONTH_DATE_PICKER_RANGE}
            className={classNames(isDark && 'bg-dark', 'react-multi-date-picker-custom')}
            plugins={plugins}
            rangeHover
        />
    );
};

export default DatePickerRange;
