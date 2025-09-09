import React, {useState} from "react";
import {MobileAppLog} from "@packages/mobileAppLogs/containers/mobileAppLogs/types";
import {getInitialPageParamRequestsList} from "@containers/requests/requestsList/helpers/getInitialParams";
import {
	getMobileAppLogsInitialDate
} from "@packages/mobileAppLogs/containers/mobileAppLogs/helpers/date/getMobileAppLogsInitialDate";
import {MobileAppLogsListState} from "@packages/mobileAppLogs/containers/mobileAppLogs/list/types/state";

const {initialDateStart, initialDateEnd} = getMobileAppLogsInitialDate()

export function useGetMobileAppLogsListState(): MobileAppLogsListState {
	const [dateStart, setDateStart] = useState<string>(initialDateStart)
	const [dateEnd, setDateEnd] = useState<string>(initialDateEnd)
	
	const [order, setOrder] = React.useState<'asc' | 'desc'>('asc');
	const [orderBy, setOrderBy] = React.useState<keyof MobileAppLog | null>(null);
	const [page, setPage] = React.useState<number>(() => getInitialPageParamRequestsList());
	const [targetMobileAppLog, setTargetMobileAppLog] = React.useState<MobileAppLog | null>(null)
	const [openModal, setOpenModal] = useState<boolean>(false)
	
	
	const [where, setWhere] = useState<string | undefined>('{}')
	
	return {
		dateStart,
		setDateStart,
		dateEnd,
		setDateEnd,
		order,
		setOrder,
		orderBy,
		setOrderBy,
		page,
		setPage,
		targetMobileAppLog,
		setTargetMobileAppLog,
		openModal,
		setOpenModal,
		where,
		setWhere,
	}
}