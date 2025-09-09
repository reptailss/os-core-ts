import {useEffect, useState} from "react";
import {StructurePluginType} from "@packages/access/containers/structurePluginTypes/types";
import {getStructurePluginTypes} from "@packages/access/containers/structurePluginTypes/api/structurePluginTypes";
import {
    getMobAppNotificationSettings
} from "@packages/mobAppSettings/containers/notificationSettings/api/notificationSettings";


export function useGetMobAppKeys(): {
    isLoading: boolean,
    mobAppKeys: string[],
    fetchMobAppKeys: () => Promise<void>
} {
    const [isLoading, setIsLoading] = useState<boolean>(true)
    const [mobAppKeys, setMobAppKeys] = useState<string[]>([])


    const fetchMobAppKeys = async () => {
        try {
            setIsLoading(true)
            const res = await getMobAppNotificationSettings()
            setMobAppKeys(res?.rows || [])
            setIsLoading(false)
        } catch (error) {
            setIsLoading(false)
            setMobAppKeys([])
        }
    }
    useEffect(() => {
        fetchMobAppKeys()
    }, []);
    return {
        isLoading,
        mobAppKeys,
        fetchMobAppKeys
    }
}
