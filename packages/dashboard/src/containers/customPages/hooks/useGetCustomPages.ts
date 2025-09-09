import {useEffect, useState} from "react";
import {CustomPage} from "@containers/customPages/types";
import {getCustomPages} from "@containers/customPages/api/getCustomPages";

export function useGetCustomPages() {
    const [customPages, setCustomPages] = useState<CustomPage[]>([])

    useEffect(() => {


        const init = async () => {
            try {
                const resCustomPages = await getCustomPages()
                setCustomPages(resCustomPages?.rows || [])
            } catch (error) {
                setCustomPages([])
            }
        }

        init()
    }, []);

    return {
        customPages
    }
}