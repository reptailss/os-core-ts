export interface ResultImportOsSystemRequests {
    count: number
    import_count: number
    status: number,
    error: boolean,
    errors: (string | {
        key: string,
        message: string
    })[]
}