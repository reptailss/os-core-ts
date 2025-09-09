import {useEffect, useState} from "react";
import {getImageGeneratorTypes} from "@packages/imageGenerator/containers/imageGeneratorTypes/api/imageGeneratorTypes";
import {ImageGeneratorType} from "@packages/imageGenerator/containers/imageGeneratorTypes/types";


export function useGetImageGeneratorTypes(): {
    isLoading: boolean,
    imageGeneratorTypes: ImageGeneratorType[],
    fetchTypes: () => Promise<void>
} {
    const [isLoading, setIsLoading] = useState<boolean>(true)
    const [imageGeneratorTypes, setImageGeneratorTypes] = useState<ImageGeneratorType[]>([])


    const fetchTypes = async () => {
        try {
            setIsLoading(true)
            const res = await getImageGeneratorTypes()
            setImageGeneratorTypes(res?.rows || [])
            setIsLoading(false)
        } catch (error) {
            setIsLoading(false)
            setImageGeneratorTypes([])
        }
    }
    useEffect(() => {
        fetchTypes()
    }, []);
    return {
        isLoading,
        imageGeneratorTypes,
        fetchTypes
    }
}
