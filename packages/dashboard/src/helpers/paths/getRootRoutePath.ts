import {getRootServicePrefix} from '@helpers/services/getRootServicePrefix'

export const getRootRoutePath = () => {
    const rootPath = getRootServicePrefix()
    if (rootPath === '/') {
        return ''
    }
    return rootPath
}


