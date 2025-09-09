import md5 from 'md5'

export class HashHelper {
    static generateHash(value: string | number[] | Buffer): string {
        return md5(value)
    }
}
