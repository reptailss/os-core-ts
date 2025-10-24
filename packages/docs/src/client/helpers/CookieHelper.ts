export class CookieHelper {
	
	static get(name: string): string | null {
		const matches = document.cookie.match(
			new RegExp(
				`(?:^|; )${name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1')}=([^;]*)`,
			),
		)
		return matches ? decodeURIComponent(matches[1]) : null
	}
	
	static set(
		name: string,
		value: string | number | boolean,
		options: {
			path?: string
			expires?: string
			maxAge?: number
		} = {}): void {
		
		const targetOptions = {
			path: options?.path || '/',
			expires: options?.expires || new Date(new Date().getTime() + 1000 * 60 * 30184000).toUTCString(),
			...options?.maxAge ? {
				'max-age': options.maxAge,
			} : {},
		}
		
		let updatedCookie = `${encodeURIComponent(name!)}=${encodeURIComponent(value)}`
		
		for (const optionKey in targetOptions) {
			updatedCookie += `; ${optionKey}`
			const optionValue = targetOptions[optionKey]
			if (optionValue !== true) {
				updatedCookie += `=${optionValue}`
			}
		}
		document.cookie = updatedCookie
	}
	
	static delete(name: string, path: string = '/'): void {
		document.cookie = `${encodeURIComponent(name)}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=${path};`
	}
	
}