export type MobileAppLogsResponse = {
	all_pages: number
	all_rows: number
	error: boolean
	page: number
	per_page: number
	rows: MobileAppLog[]
}

export  type GetMobileAppLogsParams = {
	dateStart: Date
	dateEnd: Date,
	page: number
	perPage: number
	order: 'asc' | 'desc'
	orderBy: keyof MobileAppLog | null
	where?:string
}

export type MobileAppLog = {
	_id:string
	type: string | null
	description: string | null
	app_datetime: Date | null
	app_name: string | null
	app_version: number | null
	user_id: number | null
	user_email: string | null
	location_lat: number | null
	location_long: number | null
	card_id: number | null
	limit: number | null
	card_limit: number | null
	limit_left: number | null
	balance: number | null
	card_number: string | null
	privileges: string | null
	regions: string | null
	status: string | null
	type_card: string | null
	timestamp: number | null
	result_type: string | null
	result_reason: string | null
	limits_left: string | null
	timestamp_action: string | null
	server_datetime: Date | null
}

