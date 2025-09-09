import {TransliterateHelper} from '@helpers'

export class SlugHelper {
    static generateSlug(input: string, options?: {
        spaceReplacement?: string
    }): string {
        const res = input
            .trim()
            .replace(/[^a-zA-Zа-яА-ЯёЁїЇєЄґҐіІ]/g, '-')
            .toLocaleLowerCase()

        return TransliterateHelper.transliterate(res, options)
    }
}
