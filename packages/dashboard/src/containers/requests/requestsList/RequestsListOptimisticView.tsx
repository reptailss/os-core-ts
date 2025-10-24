import * as React from 'react';
import {useState} from 'react';
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableContainer from '@mui/material/TableContainer';
import Paper from '@mui/material/Paper';

import {TableHeadRequestsListOptimistic} from "./TableHeadRequestsList";
import {sx} from './sx'
import RequestInfo from "./RequestInfo";
import {TransformServerMeta} from "@containers/requests/types/transform";
import RequestListItem from "@containers/requests/requestsList/requestListItem/RequestListItem";
import {SxStyle} from "@baseTypes/sx";
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import Button from "@mui/material/Button";
import NotFoundMessage from "@ui/notFoundMesssage/NotFoundMessage";


interface Props {
	requests: (TransformServerMeta | {page:number})[]
	isLoading?: boolean
	sxTable?: SxStyle,
	hasNextRows: boolean
	next: () => Promise<void>
	children?: React.ReactNode
}

export default function RequestsListOptimisticView({
													   requests,
													   isLoading,
													   sxTable,
													   next,
													   hasNextRows,
													   children,
												   }: Props) {
	
	const [targetRequest, setTargetRequest] = useState<TransformServerMeta | null>(null)
	const [openModal, setOpenModal] = useState<boolean>(false)
	
	const onClick = (targetRequest: TransformServerMeta) => {
		setTargetRequest(targetRequest)
		setOpenModal(true)
	}
	
	return (
		<Box
			sx={sx.root}
		>
			<RequestInfo
				targetRequest={targetRequest}
				open={openModal}
				setOpen={setOpenModal}
			/>
			
			{children && children}
			
			<Paper
				sx={sx.paper}
			>
				<TableContainer
					sx={sxTable || sx.table}
				>
					<Table
						size={'small'}
						stickyHeader
					>
						<TableHeadRequestsListOptimistic/>
						
						<TableBody>
							{requests?.map((request) => {
								if('page' in request){
									return (
										<TableRow
										key={`page_${request.page}`}
										>
											<TableCell
												colSpan={'100%' as any}
												align={'center'}
											>
												{request.page}
											</TableCell>
										</TableRow>
									)
								}
								return (
									<RequestListItem
										request={request}
										key={request.__id}
										onClick={onClick}
									/>
								);
							})}
							
							{(!hasNextRows && !requests?.length && !isLoading) && <NotFoundMessage/>}
							
							{hasNextRows && <TableRow>
                                <TableCell
                                    colSpan={'100%' as any}
                                >
                                    <Button
                                        onClick={next}
										fullWidth
										disabled={isLoading}
                                    >
                                        next
                                    </Button>
                                </TableCell>
                            </TableRow>}
						</TableBody>
					</Table>
				</TableContainer>
				
			
			</Paper>
		</Box>
	);
}
