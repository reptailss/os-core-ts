export const getStatCardTypesByRequestStatusCode = (statusCode: number) => {
    return statusCode < 300 ? 'up' : 'down'
}
