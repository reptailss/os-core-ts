import {useEffect, useState} from "react";
import {ActionLogService} from "@packages/actionsLogger/containers/actionsLogs/types";
import {getActionsLogsServicesApi} from "@packages/actionsLogger/containers/actionsLogs/api/getActionsLogsServices";

export function useGetActionsLogsServices(): {
    services: ActionLogService[]
} {
    const [services, setServices] = useState<ActionLogService[]>([])


    useEffect(() => {
        const init = async () => {
            try {
                const response = await getActionsLogsServicesApi()
                setServices(response?.rows || [])
            } catch (error) {
                setServices([])
            }
        }
        init()
    }, [])

    return {
        services
    }
}