import {useEffect, useState} from 'react'
import {getSwaggerSpecApi} from '../api'
import {SpecSwagger} from '../types'

export function useGetSwaggerSpec() :{
    isLoading:boolean,
    spec:SpecSwagger | null,
} {
    const [isLoading, setIsLoading] = useState(true)
    const [spec, setSpec] = useState<SpecSwagger | null>(null)

    useEffect(() => {
        const init = async ()=>{
            setIsLoading(true)
            try {
                const res = await getSwaggerSpecApi()
                if(!res){
                    return
                }
                setSpec(res)
            } catch (error) {

            }
            setIsLoading(false)
        }
        init()
    }, [])
    return {
        isLoading,
        spec
    }

}
