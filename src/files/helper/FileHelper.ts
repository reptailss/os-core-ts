export class FileHelper {
    static getUniqName(props: {
        originalName: string
        subPathStart?: string
        subPathMiddle?: string
    }): string
    static getUniqName(props: {
        format: string
        subPathStart?: string
        subPathMiddle?: string
    }): string
    static getUniqName({
                           originalName,
                           format,
                           subPathMiddle,
                           subPathStart,
                       }: {
        originalName?: string
        format?: string
        subPathStart?: string
        subPathMiddle?: string
    } = {}): string {
        const randomString = Date.now() + '-' + Math.floor(Math.random() * 100)
        const formatFromName = originalName ? this.getFormatFromName(originalName) : ''
        const formatStr = format ? `.${format}` : formatFromName ? `.${formatFromName}` : ''
        const subPathMiddleStr = subPathMiddle ? `${subPathStart ? '/' : ''}${subPathMiddle}` : ''
        return `${subPathStart || ''}${subPathMiddleStr}-${randomString}${formatStr}`
    }

    static getFormatFromName(name: string): string {
        const arr = name.split('.')
        if (arr?.length < 2) {
            return ''
        }
        return arr[arr.length - 1]
    }
}
