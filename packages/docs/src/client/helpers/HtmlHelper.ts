export class HtmlHelper{
     static stripHtmlTags(input: string): string {
        return input.replace(/<\/?[^>]+(>|$)/g, '');
    }
    
}