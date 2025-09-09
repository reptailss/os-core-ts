import {getRootRoutePath} from "@helpers/paths/getRootRoutePath";
import {useMemo} from "react";
import {IMAGE_GENERATOR_TYPES_PAGE_PATH} from "@packages/imageGenerator/pages/imageGeneratorTypes/constants";

export function useGetImageGeneratorPagePaths(): {
    generatorTypes: string
} {
    return useMemo(() => {
        const baseUrl = getRootRoutePath()
        return {
            generatorTypes: `${baseUrl}${IMAGE_GENERATOR_TYPES_PAGE_PATH}`,
        }
    }, [])
}