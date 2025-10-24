import {ITextBlock, TextBlockVariant} from '@docBlocks/interfaces/ITextBlock'


export class TextBlock implements ITextBlock {
    public type = 'text' as const
    private textList: {
        text: string
        link: string | null
        isLink: boolean
        isPrimary: boolean
        hasCodeReplaces: boolean
    }[] = []
    private variant: TextBlockVariant = 'body2'
    
    
    public appendText(text: string): this {
        this.textList.push({
            text,
            isLink: false,
            isPrimary: false,
            link: null,
            hasCodeReplaces: false,
        })
        return this
    }
    
    public appendPrimaryText(text: string): this {
        this.textList.push({
            text,
            isLink: false,
            isPrimary: true,
            link: null,
            hasCodeReplaces: false,
        })
        return this
    }
    
    public appendLinkFromObject({
                                    title,
                                    path
                                }: {
        path: string
        title: string,
    }): this {
        this.textList.push({
            text: title,
            isLink: true,
            isPrimary: false,
            link: path,
            hasCodeReplaces: false,
        })
        return this
    }
    
    public appendLink(link: string, text: string): this {
        this.textList.push({
            text,
            isLink: true,
            isPrimary: false,
            link,
            hasCodeReplaces: false,
        })
        return this
    }
    
    public getTexts(): {
        text: string
        isLink: boolean
        isPrimary: boolean
        link: string | null
        hasCodeReplaces: boolean
    }[] {
        return this.textList
    }
    
    public appendCodeLink(text: string): this {
        this.textList.push({
            text,
            isLink: false,
            isPrimary: false,
            link: null,
            hasCodeReplaces: true,
        })
        return this
    }
    
    
    public setVariant(variant: TextBlockVariant): this {
        this.variant = variant
        return this
    }
    
    public getVariant(): TextBlockVariant {
        return this.variant
    }
    
}