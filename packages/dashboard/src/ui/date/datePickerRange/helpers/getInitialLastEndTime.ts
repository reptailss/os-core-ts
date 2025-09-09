import {DateObject} from "react-multi-date-picker";

export const getInitialLastEndTime = ({
                                          value,
                                          resetTimeEnd,
                                          hasResetTimeOnChangeHasTime
                                      }: {
    value: DateObject[],
    resetTimeEnd?: string,
    hasResetTimeOnChangeHasTime?: boolean
}):{
    hour: number,
    minutes: number,
    seconds: number,
} => {

    if (value?.length === 2) {
        const endDate = value[1]
        return {
            hour: endDate.hour,
            minutes: endDate.minute,
            seconds: endDate.second
        }
    }
    if (hasResetTimeOnChangeHasTime) {
        const timeEnd = resetTimeEnd?.split(':')
        if (timeEnd?.length === 3) {
            const [hour, minutes, seconds] = timeEnd;
            return {
                hour: Number(hour),
                minutes: Number(minutes),
                seconds: Number(seconds),
            }
        }
        if (timeEnd?.length === 2) {
            const [hour, minutes] = timeEnd;
            return {
                hour: Number(hour),
                minutes: Number(minutes),
                seconds: 0,
            }
        }
    }

    return  {
        hour: 0,
        minutes: 0,
        seconds: 0,
    }
}