import {ActionLog, GetActionsLogsParams} from "@packages/actionsLogger/containers/actionsLogs/types/index";

export type GetActionsLogs = (props: GetActionsLogsParams) => Promise<ActionLog[]>