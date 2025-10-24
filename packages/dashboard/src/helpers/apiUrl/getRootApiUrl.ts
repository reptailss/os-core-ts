import {getRootServicePrefix} from '@helpers/services/getRootServicePrefix'

export const getRootApiUrl = () => {
	const rootPath = getRootServicePrefix()
	if (rootPath === '/') {
		return '/'
	}
	return `/${rootPath}/`
}


