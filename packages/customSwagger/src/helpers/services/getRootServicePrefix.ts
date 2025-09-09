

export const getRootServicePrefix = () => {
    const pathname = window.location.pathname
    const hostname = window.location.hostname
    const arr = pathname.split('/')
    if (hostname.includes('localhost')) {
        return '/'
    }
    if('_servicePrefix' in window && window._servicePrefix){
        return window._servicePrefix as string
    }
    return `${arr[1]}/${arr[2]}`
}