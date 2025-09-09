import React, {useState} from 'react';
import Grid2 from '@mui/material/Grid2';
import IconButton from '@mui/material/IconButton';
import {sx} from './sx';
import Spinner from '@ui/spinner/Spinner';
import {useGetMobileAppLogs} from '@packages/mobileAppLogs/containers/mobileAppLogs/hooks/useGetMobileAppLogs';
import {MobileAppLog} from '@packages/mobileAppLogs/containers/mobileAppLogs/types';
import {
	useGetMobileAppLogsListState
} from '@packages/mobileAppLogs/containers/mobileAppLogs/list/hooks/useGetMobileAppLogsListState';
import MobileAppLogsListView from '@packages/mobileAppLogs/containers/mobileAppLogs/list/view/MobileAppLogsListView';
import MobileAppLogsListSidebar
	from '@packages/mobileAppLogs/containers/mobileAppLogs/list/view/sidebar/MobileAppLogsListSidebar';
import MenuIcon from '@mui/icons-material/Menu';
import {useMedia} from "@hooks/useMedia";

const MobileAppLogsList = () => {
	
	const mobileAppLogsListState = useGetMobileAppLogsListState()
	
	const [isSidebarVisible, setIsSidebarVisible] = useState(true)
	
	const {
		mobileAppLogs,
		totalPage,
		getMobileAppLogs,
		isLoading
	} = useGetMobileAppLogs();
	
	const{isDesktop} = useMedia()
	const toggleSidebar = () => setIsSidebarVisible((prev) => !prev);
	
	const onChangeSort = ({
							  order,
							  orderBy
						  }: {
		order: 'desc' | 'asc';
		orderBy: keyof MobileAppLog;
	}) => {
		getMobileAppLogs({
			dateStart: mobileAppLogsListState.dateStart,
			dateEnd: mobileAppLogsListState.dateEnd,
			page: mobileAppLogsListState.page,
			perPage: 20,
			orderBy,
			order,
			where: mobileAppLogsListState.where
		});
	};
	
	const onChangePage = (page: number) => {
		getMobileAppLogs({
			dateStart: mobileAppLogsListState.dateStart,
			dateEnd: mobileAppLogsListState.dateEnd,
			page,
			perPage: 20,
			orderBy: mobileAppLogsListState.orderBy,
			order: mobileAppLogsListState.order,
			where: mobileAppLogsListState.where
		});
	};
	
	return (
		<>
			{isLoading && <Spinner variant="overlay"/>}
			
			<Grid2
				container spacing={1}
				sx={sx.container}
			>
				<IconButton
					onClick={toggleSidebar}
					sx={sx.btn}
				>
					<MenuIcon/>
				</IconButton>
				
				{isSidebarVisible && <Grid2
                    size={!isDesktop ? 12 : isSidebarVisible ? 4 : 1}
                    sx={sx.sidebar}
                >
					{isSidebarVisible && <MobileAppLogsListSidebar
                        mobileAppLogsListState={mobileAppLogsListState}
                        getMobileAppLogs={getMobileAppLogs}
                    />}
                </Grid2>}
				<Grid2
					size={!isDesktop ? 12 : isSidebarVisible ? 8 : 12}
				>
					<MobileAppLogsListView
						isLoading={isLoading}
						mobileAppLogsListState={mobileAppLogsListState}
						mobileAppLogs={mobileAppLogs}
						totalPage={totalPage}
						onChangeSort={onChangeSort}
						onChangePage={onChangePage}
					/>
				</Grid2>
			</Grid2>
		</>
	);
};

export default MobileAppLogsList;
