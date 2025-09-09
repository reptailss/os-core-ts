import {useEffect, useState} from "react";
import {StructurePluginType} from "@packages/access/containers/structurePluginTypes/types";
import {getStructurePluginTypes} from "@packages/access/containers/structurePluginTypes/api/structurePluginTypes";


export function useGetStructurePluginTypes(): {
    isLoading: boolean,
    structurePluginTypes: StructurePluginType[],
    fetchPluginTypes: () => Promise<void>
} {
    const [isLoading, setIsLoading] = useState<boolean>(true)
    const [structurePluginTypes, setStructurePluginTypes] = useState<StructurePluginType[]>([])


    const fetchPluginTypes = async () => {
        try {
            setIsLoading(true)
            const res = await getStructurePluginTypes()
            setStructurePluginTypes(res?.rows || [])
            setIsLoading(false)
        } catch (error) {
            setIsLoading(false)
            setStructurePluginTypes([])
        }
    }
    useEffect(() => {
        fetchPluginTypes()
    }, []);
    return {
        isLoading,
        structurePluginTypes,
        fetchPluginTypes
    }
}
