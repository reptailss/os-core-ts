import path from 'path'


const FILE_NAME = `%DATE%.log`
const DATE_PATTERN = 'YYYY-MM-DD'

export class ConsoleLoggerHelper {
    static getFilePath = (props: {
        year: number,
        month: string,
        day: string,
    }) => {
        const dirPath = this.getDirPath()
        const fileName = this.getFileNameByDate(props)
        return path.join(dirPath, fileName)
    }

    static getDirPath = () => {
        const logDir = process.cwd()
        return path.join(logDir, 'logs', 'console')
    }

    static getFileNameByDate({
                                 year,
                                 month,
                                 day,
                             }: {
        year: number,
        month: string,
        day: string,
    }): string {
        return FILE_NAME.replace(/%DATE%/g, `${year}-${month}-${day}`)
    }

    static getFileName(): string {
        return FILE_NAME
    }

    static getDatePattern(): string {
        return DATE_PATTERN
    }

}