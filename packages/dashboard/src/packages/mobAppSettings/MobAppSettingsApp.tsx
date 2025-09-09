import React from 'react'
import '@baseStyles/app.css'
import {
    useGetMobAppSettingsNavigation
} from "@packages/mobAppSettings/navigations/hooks/useGetMobAppSettingsNavigation";
import MobAppSettingsRoutes from "@packages/mobAppSettings/routes/MobAppSettingsRoutes";
import DashboardServiceAppRoot from '@packages/dashboardService/DashboardServiceAppRoot'


const MobAppSettingsApp = () => {

    const navigations = useGetMobAppSettingsNavigation()

    return (
        <DashboardServiceAppRoot
            navigations={navigations}
        >
            <MobAppSettingsRoutes/>
        </DashboardServiceAppRoot>
    )
}

export default MobAppSettingsApp