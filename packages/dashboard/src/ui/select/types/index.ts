import {ISelectCustomGroupItem, ISelectCustomItem} from "@ui/select/selectCustom/types";


export interface ISelectPropsOption<T = unknown> {
    isLoading?: boolean,
    isError?: boolean,

    setPage?: (page: number) => void,
    label?: string | false | null | any,
    size?: 'small',
    disabled?: boolean,
    className?: string,
    width?: number | string,
    notItemsText?: string,
    error?: boolean,
    errorMessage?: string,
    placeholder?: string,
    disabledPointerEvents?: boolean,
    keyValue?: keyof T,

}

export interface ISelectBaseProps<T> extends ISelectPropsOption<T> {
    value: string,
    onChange: (value: string) => void,
    initialValue?: string,
}

export interface ISelectProps<T> extends ISelectBaseProps<T> {
    data: ISelectCustomItem<T>[]
    value: string,
}

type ItemFullSelect<T> = ISelectCustomItem<T> | string

export interface ISelectMultiBaseProps<T> extends ISelectPropsOption<T> {
    onChange: (array: string[], fullArray?: ItemFullSelect<T>[]) => void,
    value: string[],
    initialValue?: string[]
}

export interface ISelectMultiProps<T> extends ISelectPropsOption<T> {
    onChange: (array: string[], fullArray?: ItemFullSelect<T>[]) => void,
    value: string[],
    data: ISelectCustomItem<T>[]
    initialValue?: string[]
}

export interface ISelectMultiGroupProps<T> extends ISelectPropsOption<T> {
    onChange: (array: string[], fullArray?: ItemFullSelect<T>[]) => void,
    value: string[],
    data: ISelectCustomGroupItem<T>[],
}