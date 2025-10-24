export type TextBlockVariant =
    | 'h1'
    | 'h2'
    | 'h3'
    | 'h4'
    | 'h5'
    | 'h6'
    | 'subtitle1'
    | 'subtitle2'
    | 'body1'
    | 'body2'
    | 'caption'
    | 'button'
    | 'overline'


export interface ITextBlock {
    type: 'text'
    
    appendText(text: string): this
    
    appendPrimaryText(text: string): this
    
    appendLink(path: string, title: string): this
    
    appendLinkFromObject(props: {
        path: string
        title: string
    }): this
    
    appendCodeLink(text:string):this
    
    setVariant(variant: TextBlockVariant): this
    
    getVariant(): TextBlockVariant
    
    getTexts(): {
        text: string
        isLink: boolean
        isPrimary: boolean
    }[]
}