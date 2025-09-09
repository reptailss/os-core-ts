import {RequestErrorStatus} from "@containers/requests/types/errorStatus";

export const ERROR_STATUSES: {
    value: RequestErrorStatus,
    label: string
}[] = [
    {value: 'all', label: 'Всі'},
    {value: 'error', label: 'Є помилка'},
    {value: 'notError', label: 'Немає помилки'},

]