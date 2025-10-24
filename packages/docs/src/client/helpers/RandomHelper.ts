export class RandomHelper {
    
    static getString(len?: number) {
        return Math.random().toString(36).substring(2, (len || 4) + 2)
    };
    
    
}