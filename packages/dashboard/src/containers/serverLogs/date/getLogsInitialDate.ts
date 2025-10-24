export function getLogsInitialDate(): { initialDateStart: Date, initialDateEnd: Date } {
	const now = new Date()
	const initialDateEnd = now
	now.setDate(now.getDate() - 7)
	
	return {initialDateStart: new Date(), initialDateEnd}
}
