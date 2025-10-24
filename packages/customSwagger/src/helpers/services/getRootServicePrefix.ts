export const getRootServicePrefix = () => {
	
	if ('_servicePrefix' in window && window._servicePrefix) {
		return window._servicePrefix as string
	}
	
	const pathname = window.location.pathname
	const arr = pathname.split('/').filter(Boolean).filter((it) => it !== 'swagger')
	
	if (arr.length === 1) {
		return `/${arr[0]}`
	}
	
	if (arr.length < 2) {
		return '/'
	}
	
	return `/${arr[0]}/${arr[1]}`
}

