import {ActionLogType} from "@packages/actionsLogger/containers/actionsLogs/types";

export const ACTION_LOG_TYPES: {
    value: ActionLogType,
    label: string
}[] = [
    {value: 'ADD', label: 'ADD'},
    {value: 'UPDATE', label: 'UPDATE'},
    {value: 'DELETE', label: 'DELETE'},
]