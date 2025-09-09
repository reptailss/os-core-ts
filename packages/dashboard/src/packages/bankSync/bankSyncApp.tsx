import React from 'react';
import "@baseStyles/app.css"
import DashboardServiceAppRoot from "@packages/dashboardService/DashboardServiceAppRoot";
import BankSyncRoutes from "@packages/bankSync/routes/BankSyncRoutes";
import {useGetBankSyncNavigation} from "@packages/bankSync/navigations/hooks/useGetBankSyncNavigation";


const BankSyncApp = () => {

    const navigations = useGetBankSyncNavigation()

    return (
        <DashboardServiceAppRoot
            navigations={navigations}
        >
            <BankSyncRoutes/>
        </DashboardServiceAppRoot>
    )
};

export default BankSyncApp;