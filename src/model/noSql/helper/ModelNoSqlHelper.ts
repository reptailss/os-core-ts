import {DateHelper} from '@helpers'
import {OrderParams} from '@params'

export class ModelNoSqlHelper {
    
    static getCollectionNamesPaginationByDateRangeNoSql({
                                                            dateStart,
                                                            dateEnd,
                                                        }: {
        dateStart: string | Date,
        dateEnd: string | Date
    }): string[] {
        return DateHelper.generateDateIntervalsYearAndMonthByRange(dateStart, dateEnd).map((item) => {
            return `${item.year}||${item.month}`
        })
    }
    
    static getYearAndMothByCollectionName(collectionName: string): {
        year: number,
        month: number
    } {
        const arr = collectionName?.split('||')
        if (arr.length < 2) {
            return {
                year: 0,
                month: 0,
            }
        }
        
        return {
            year: Number(arr[0]),
            month: Number(arr[1]),
        }
    };
    
    
    static checkReverseCollection<Row extends object>({
                                      order,
                                      dateFilterKey,
                                  }: {
        order?: OrderParams<Row>
        dateFilterKey: keyof Row
    }) {
        if(
            !dateFilterKey ||
            !order ||
            !(dateFilterKey in order)
        ){
            return false
        }
        //@ts-ignore
        return  order[dateFilterKey] === 'DESC'
    }
}