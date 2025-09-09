import {AppError} from '@appError'


export class DateHelper {
    static getCurrentMonth(): number {
        return (new Date().getUTCMonth() + 1)
    }

    static getCurrentYear(): number {
        return new Date().getUTCFullYear()
    }

    static getMonthAndYearFromDate(date: Date): {
        month: number
        year: number
    } {
        const currentDate = new Date(date)
        return {
            month: currentDate.getMonth() + 1,
            year: currentDate.getFullYear(),
        }
    }

    static generateDateIntervalsYearAndMonthByRange(start: string | Date, end: string | Date): {
        year: number,
        month: string
    }[] {
        const dateStart = new Date(start)
        const dateEnd = new Date(end)

        if (dateEnd < dateStart) {
            throw new AppError('End date cannot be earlier than start date', {
                errorKey: 'VALIDATION_ERROR',
            })
        }

        const intervals: {
            year: number,
            month: string
        }[] = []

        let currentMonth = dateStart.getMonth() + 1
        let currentYear = dateStart.getFullYear()

        while (currentYear < dateEnd.getFullYear() || (currentYear === dateEnd.getFullYear() && currentMonth <= dateEnd.getMonth() + 1)) {
            intervals.push({
                year: currentYear,
                month: currentMonth.toString().padStart(2, '0'),
            })

            if (currentMonth === 12) {
                currentMonth = 1
                currentYear++
            } else {
                currentMonth++
            }
        }

        return intervals
    }

    static generateDateIntervalsByDayRange(start: string | Date, end: string | Date): {
        year: number,
        month: string
        day: string
    }[] {
        const dateStart = new Date(start)
        const dateEnd = new Date(end)

        if (dateEnd < dateStart) {
            throw new AppError('End date cannot be earlier than start date', {
                errorKey: 'VALIDATION_ERROR',
            })
        }

        const intervals: {year: number, month: string, day: string}[] = []

        let currentDate = new Date(dateStart)

        while (currentDate <= dateEnd) {
            intervals.push({
                year: currentDate.getFullYear(),
                month: (currentDate.getMonth() + 1).toString().padStart(2, '0'),
                day: currentDate.getDate().toString().padStart(2, '0'),
            })

            currentDate.setDate(currentDate.getDate() + 1)
        }

        return intervals
    }

    static getDateFormat(format?:
                             'y-m-d h:i:s' |
                             'd-m-y' |
                             'd-m-y h:i:s',
                         date?: Date | null): string {
        const targetDate = date || new Date()
        let targetFormat:string = format || 'y-m-d h:i:s'
        let year: string | number = targetDate.getFullYear()
        targetFormat = targetFormat.replace('y', year.toString())
        let month: string | number = targetDate.getMonth() + 1
        if (month < 10) {
            month = '0' + month
        }
        targetFormat = targetFormat.replace('m', month.toString())
        let day: string | number = targetDate.getDate()
        if (day < 10) {
            day = '0' + day
        }
        targetFormat = targetFormat.replace('d', day.toString())
        let hours: string | number = targetDate.getHours()
        if (hours < 10) {
            hours = '0' + hours
        }
        targetFormat = targetFormat.replace('h', hours.toString())
        let minutes: string | number = targetDate.getMinutes()
        if (minutes < 10) {
            minutes = '0' + minutes
        }
        targetFormat = targetFormat.replace('i', minutes.toString())
        let seconds: string | number = targetDate.getSeconds()
        if (seconds < 10) {
            seconds = '0' + seconds
        }
        targetFormat = targetFormat.replace('s', seconds.toString())
        return targetFormat
    }

    static isDateInFuture(date: Date): boolean {
        const currentDate = new Date()
        return new Date(date) > currentDate
    }

    static isDateInPast(date: Date): boolean {
        const currentDate = new Date()
        return new Date(date) < currentDate
    }

}
