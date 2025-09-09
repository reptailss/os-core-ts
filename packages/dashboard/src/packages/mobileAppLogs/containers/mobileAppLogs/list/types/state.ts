import {SetStateFn} from "@baseTypes/state";
import {MobileAppLog} from "@packages/mobileAppLogs/containers/mobileAppLogs/types";

export type MobileAppLogsListState = {
	dateStart: string
	setDateStart: SetStateFn<string>
	dateEnd: string
	setDateEnd: SetStateFn<string>
	order: 'asc' | 'desc'
	setOrder: SetStateFn<'asc' | 'desc' >
	orderBy: keyof MobileAppLog | null
	setOrderBy: SetStateFn<keyof MobileAppLog | null>
	page: number
	setPage: SetStateFn<number>
	targetMobileAppLog: MobileAppLog | null
	setTargetMobileAppLog: SetStateFn<MobileAppLog | null>
	openModal: boolean
	setOpenModal: SetStateFn<boolean>
	where: string | undefined
	setWhere: SetStateFn<string | undefined>
}