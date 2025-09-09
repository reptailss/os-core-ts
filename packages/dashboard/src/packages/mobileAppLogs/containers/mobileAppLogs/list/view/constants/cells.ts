import {MobileAppLog} from "@packages/mobileAppLogs/containers/mobileAppLogs/types";

interface MobileAppLogCell {
	disablePadding: boolean;
	id: keyof MobileAppLog;
	label: string;
	numeric: boolean;
}

export const MOBILE_APP_LOG_CELLS: readonly MobileAppLogCell[] = [
	{id: 'type', numeric: false, disablePadding: false, label: 'type'},
	{id: 'description', numeric: false, disablePadding: false, label: 'description'},
	{id: 'app_datetime', numeric: false, disablePadding: false, label: 'app_datetime'},
	{id: 'app_name', numeric: false, disablePadding: false, label: 'app_name'},
	{id: 'app_version', numeric: true, disablePadding: false, label: 'app_version'},
	{id: 'user_id', numeric: true, disablePadding: false, label: 'user_id'},
	{id: 'user_email', numeric: false, disablePadding: false, label: 'user_email'},
	{id: 'location_lat', numeric: true, disablePadding: false, label: 'location_lat'},
	{id: 'location_long', numeric: true, disablePadding: false, label: 'location_long'},
	{id: 'card_id', numeric: true, disablePadding: false, label: 'card_id'},
	{id: 'limit', numeric: true, disablePadding: false, label: 'limit'},
	{id: 'card_limit', numeric: true, disablePadding: false, label: 'card_limit'},
	{id: 'limit_left', numeric: true, disablePadding: false, label: 'limit_left'},
	{id: 'balance', numeric: true, disablePadding: false, label: 'balance'},
	{id: 'card_number', numeric: false, disablePadding: false, label: 'card_number'},
	{id: 'privileges', numeric: false, disablePadding: false, label: 'privileges'},
	{id: 'regions', numeric: false, disablePadding: false, label: 'regions'},
	{id: 'status', numeric: false, disablePadding: false, label: 'status'},
	{id: 'type_card', numeric: false, disablePadding: false, label: 'type_card'},
	{id: 'timestamp', numeric: true, disablePadding: false, label: 'timestamp'},
	{id: 'result_type', numeric: false, disablePadding: false, label: 'result_type'},
	{id: 'result_reason', numeric: false, disablePadding: false, label: 'result_reason'},
	{id: 'limits_left', numeric: false, disablePadding: false, label: 'limits_left'},
	{id: 'timestamp_action', numeric: false, disablePadding: false, label: 'timestamp_action'},
	{id: 'server_datetime', numeric: false, disablePadding: false, label: 'server_datetime'},
];