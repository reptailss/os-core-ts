import {DateHelper} from '@helpers'
import {ConsoleLoggerHelper} from '@logger/core'
import {promises} from 'fs'
import {Injectable} from '@decorators'

export class GetConsoleLogsService {
    
    public async getLogs({
                             dateEnd,
                             dateStart,
                         }: {
        dateStart: Date,
        dateEnd: Date,
    }): Promise<string[]> {
        
        const intervals = DateHelper.generateDateIntervalsByDayRange(dateStart, dateEnd)
        
        if (!intervals.length) {
            return []
        }
        
        const res: string[] = []
        
        for (const interval of intervals) {
            try {
                const logsFolderPath = ConsoleLoggerHelper.getFilePath({
                        year: interval.year,
                        month: interval.month,
                        day: interval.day,
                    },
                )
                const str = await promises.readFile(logsFolderPath, 'utf8')
                
                const array = str?.split(/\r?\n/)
                if (!array?.length) {
                    continue
                }
                array.forEach((line) => {
                    res.push(line)
                })
                
            } catch (error) {
            }
        }
        
        return res
    }
}