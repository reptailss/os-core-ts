export interface IAppLogger {
    error: (...args: any[]) => void,
    info: (...args: any[]) => void,
}
