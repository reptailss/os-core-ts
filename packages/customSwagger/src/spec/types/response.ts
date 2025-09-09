export type ResponseErrorDescriptionSwagger = {
    errorKey: string,
    errorCode: string,
    statusCode: number,
    message: string,
}


export type ResponsesSwagger = Record<string, ResponseSwagger>


export type ResponseSwagger = {
    description?: string,
    schema?: {
        $ref?: string,
        type?:'object',
        properties?:ResponsesSwagger,
        items?:ResponseSwagger,
    },
    $ref?: string,
    type?:'object',
    properties?:ResponsesSwagger,
    items?:ResponseSwagger,
    allOf?:ResponseSwagger[]
    anyOf?:ResponseSwagger[]

}
