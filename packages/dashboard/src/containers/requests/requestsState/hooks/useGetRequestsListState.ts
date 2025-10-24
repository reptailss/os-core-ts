import * as React from "react";
import {useState} from "react";
import {
	getInitialOrderByParamRequestsList,
	getInitialOrderParamRequestsList,
	getInitialPageParamRequestsList
} from "@containers/requests/requestsList/helpers/getInitialParams";
import {TransformServerMeta} from "@containers/requests/types/transform";
import {RequestsListState} from "@containers/requests/requestsState/types";
import {ServerMeta} from "@containers/requests/types/meta";
import {RequestErrorStatus} from "@containers/requests/types/errorStatus";
import {useGetRequestDateRangeState} from "@containers/requests/requestsState/hooks/useGetRequestDateRangeState";

export function useGetRequestsListState({perPage}: {
	perPage?: number
} = {}): RequestsListState {
	
	const [order, setOrder] = React.useState<'asc' | 'desc'>(() => getInitialOrderParamRequestsList());
	const [orderBy, setOrderBy] = React.useState<keyof ServerMeta>(() => getInitialOrderByParamRequestsList());
	const [page, setPage] = React.useState(() => getInitialPageParamRequestsList());
	const [targetRequest, setTargetRequest] = useState<TransformServerMeta | null>(null)
	const [openModal, setOpenModal] = useState<boolean>(false)
	
	const [statusCodes, setStatusCodes] = useState<string[]>([])
	const [errorCodes, setErrorCodes] = useState<string[]>([])
	const [errorStatus, setErrorStatus] = useState<RequestErrorStatus>('all')
	const [targetEndpoints, setTargetEndpoints] = useState<string[]>([])
	const [where, setWhere] = useState<string | undefined>()
	
	const {
		dateStart,
		dateEnd,
		setDateStart,
		setDateEnd,
	} = useGetRequestDateRangeState()
	
	return {
		order,
		setOrder,
		orderBy,
		setOrderBy,
		page,
		setPage,
		targetRequest,
		setTargetRequest,
		openModal,
		setOpenModal,
		perPage: perPage || 100,
		
		errorCodes,
		setErrorCodes,
		
		statusCodes,
		setStatusCodes,
		
		errorStatus,
		setErrorStatus,
		targetEndpoints,
		setTargetEndpoints,
		dateEnd,
		dateStart,
		setDateEnd,
		setDateStart,
		where,
		setWhere
	}
}