export type ErrorDataType = {
    errorStatus: number
    errorDescription: string
    altUrl: string
    altUrlLabel: string
}

export enum Status {
    NotFound = 404,
    InternalSeverError = 500
}
