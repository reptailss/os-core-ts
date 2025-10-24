export const getRootServicePrefix = (): string => {
	
	if ('_servicePrefix' in window && window._servicePrefix) {
		return window._servicePrefix as string
	}
	
	const pathname = window.location.pathname
	const arr = pathname.split('/').filter(Boolean)
	
	const arrWithoutDashboard: string[] = []
	
	for (const str of arr) {
		if (str === 'dashboard') {
			break
		}
		arrWithoutDashboard.push(str)
	}
	if (!arrWithoutDashboard.length) {
		return '/'
	}
	
	return arrWithoutDashboard.join('/')
}