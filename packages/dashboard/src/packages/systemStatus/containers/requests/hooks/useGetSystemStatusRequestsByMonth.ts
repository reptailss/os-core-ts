import {useCallback, useState} from "react";
import {TransformServerMeta} from "@containers/requests/types/transform";
import {getSystemStatusRequestsByMonth} from "@packages/systemStatus/containers/requests/api/getRequests";
import {transformRequestsData} from "@containers/requests/helpers/transformRequestsData";
import {SystemEndpoint} from "@packages/systemStatus/containers/endpoints/types";
import {RequestErrorStatus} from "@containers/requests/types/errorStatus";


const PER_PAGE = 60

export function useGetSystemStatusRequestsByMonth(systemEndpoints: SystemEndpoint[]): {
	isLoading: boolean
	requests: (TransformServerMeta | {
		page: number
	})[]
	next: () => Promise<void>
	getByFilters: ({
					   dateStart,
					   errorStatus,
					   openUserId,
					   targetEndpoints,
				   }: {
		dateStart: Date
		openUserId: number | null
		targetEndpoints: string[]
		errorStatus: RequestErrorStatus
		order: 'ASC' | 'DESC' | null
	}) => Promise<void>
	hasNextRows: boolean
} {
	const [filters, setFilters] = useState<{
		dateStart: Date
		openUserId: number | null
		targetEndpoints: string[]
		errorStatus: RequestErrorStatus
		order: 'ASC' | 'DESC' | null
	}>({
		dateStart: new Date(),
		openUserId: null,
		targetEndpoints: [],
		errorStatus: 'all',
		order:null
	})
	const [hasNextRows, setHasNextRows] = useState<boolean>(false)
	const [isLoading, setIsLoading] = useState<boolean>(false)
	const [requests, setRequests] = useState<(TransformServerMeta | {
		page: number
	})[]>([])
	const [offset, setOffset] = useState<number>(0)
	
	const getByFilters = useCallback(async (props: {
		dateStart: Date
		openUserId: number | null
		targetEndpoints: string[]
		errorStatus: RequestErrorStatus
		order: 'ASC' | 'DESC' | null
	}) => {
		setOffset(0)
		try {
			setIsLoading(true)
			setFilters(props)
			const res = await getSystemStatusRequestsByMonth({
				dateStart: props.dateStart,
				errorStatus: props.errorStatus,
				offset: 0,
				openUserId: props.openUserId,
				targetEndpoints: props.targetEndpoints,
				limit: PER_PAGE,
				order:props.order
			}, systemEndpoints)
			if (!res?.rows?.length) {
				setHasNextRows(false)
				setIsLoading(false)
				setRequests([])
				return
			}
			const serverRequests = transformRequestsData(res)
			setRequests(serverRequests?.requests)
			setIsLoading(false)
			setHasNextRows(res.rows.length >= PER_PAGE)
		} catch (error) {
			setRequests([])
			setHasNextRows(false)
			setIsLoading(false)
		}
	}, [systemEndpoints])
	
	
	const next = useCallback(async () => {
		const newOffset = offset + PER_PAGE
		const page = (newOffset / PER_PAGE) + 1
		try {
			setIsLoading(true)
			const res = await getSystemStatusRequestsByMonth({
				dateStart: filters.dateStart,
				errorStatus: filters.errorStatus,
				offset: newOffset,
				openUserId: filters.openUserId,
				targetEndpoints: filters.targetEndpoints,
				limit: PER_PAGE,
				order:filters.order
			}, systemEndpoints)
			if (!res?.rows?.length) {
				setIsLoading(false)
				setHasNextRows(false)
				return
			}
			const serverRequests = transformRequestsData(res)
			setRequests((prev) => {
				return [
					...prev,
					{
						page,
					},
					...serverRequests.requests
				]
			})
			setOffset(newOffset)
			setIsLoading(false)
			setHasNextRows(res.rows.length >= PER_PAGE)
		} catch (error) {
			setRequests([])
			setHasNextRows(false)
			setIsLoading(false)
		}
		
	}, [filters, offset])
	
	return {
		isLoading,
		requests,
		next,
		getByFilters,
		hasNextRows,
	}
}
