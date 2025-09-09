import React from 'react'
import {ISelectCustomItem} from "@ui/select/selectCustom/types";
import { convertArrayToObj } from '@helpers/convert/convert';

interface IProps<T> {
    data: ISelectCustomItem<T>[],
    keyValue?: keyof T | string

}

export function useGetSelectData<T>({data,keyValue}: IProps<T>):{
    arr:string[],
    obj:Record<string, ISelectCustomItem<T>>
} {

    return React.useMemo(() => {
        if (!data?.length) {
            return {
                arr: [],
                obj: {}
            }
        }

        const arr = data.map((item) => {
            return item?.value?.toString()
        })
        const obj = convertArrayToObj<ISelectCustomItem<T>,any>({arr: data, key: keyValue ?? 'value'})

        return {
            arr,
            obj,
        }

    }, [data])

}