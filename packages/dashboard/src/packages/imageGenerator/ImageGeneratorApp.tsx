import React from 'react';
import "@baseStyles/app.css"
import DashboardServiceAppRoot from "@packages/dashboardService/DashboardServiceAppRoot";
import ImageGeneratorRoutes from "@packages/imageGenerator/routes/ImageGeneratorRoutes";
import {
    useGetImageGeneratorNavigation
} from "@packages/imageGenerator/navigations/hooks/useGetImageGeneratorNavigation";


const ImageGeneratorApp = () => {

    const navigations = useGetImageGeneratorNavigation()

    return (
        <DashboardServiceAppRoot
            navigations={navigations}
        >
            <ImageGeneratorRoutes/>
        </DashboardServiceAppRoot>
    )
};

export default ImageGeneratorApp;