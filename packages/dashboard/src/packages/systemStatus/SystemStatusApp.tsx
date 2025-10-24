import React from 'react'
import CssBaseline from '@mui/material/CssBaseline'
import AppTheme from '@views/theme/AppTheme'
import AuthContextProvider from '@containers/auth/context/AuthContextProvider'
import Auth from '@containers/auth/Auth'
import RootLayout from '@views/layouts/rootLayout/RootLayout'
import '@baseStyles/app.css'
import AppContextProvider from '@appContext/AppContextProvider'
import SystemStatusRoutes from "@packages/systemStatus/routes/SystemStatusRoutes";
import {useGetSystemStatusNavigation} from "@packages/systemStatus/navigations/hooks/useGetSystemStatusNavigation";
import ViewContextProvider from "@viewContext/ViewContextProvider";
import {LocalizationProvider} from "@mui/x-date-pickers";
import {AdapterMoment} from "@mui/x-date-pickers/AdapterMoment";
import {ukUA as pickerUkUA} from "@mui/x-date-pickers/locales/ukUA";
import moment from 'moment'


moment.locale('uk')

const SystemStatusApp = () => {
	
	const navigations = useGetSystemStatusNavigation()
	
	return (
		<AppTheme>
			<CssBaseline/>
			<LocalizationProvider
				dateAdapter={AdapterMoment}
				localeText={pickerUkUA.components.MuiLocalizationProvider.defaultProps.localeText}
			>
				<ViewContextProvider>
					<AppContextProvider
						navigations={navigations}
					>
						<AuthContextProvider>
							<Auth>
								<RootLayout>
									<SystemStatusRoutes/>
								</RootLayout>
							</Auth>
						</AuthContextProvider>
					</AppContextProvider>
				</ViewContextProvider>
			</LocalizationProvider>
		</AppTheme>
	)
}

export default SystemStatusApp